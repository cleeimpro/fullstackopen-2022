const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (blog)
        response.json(blog)
    else
        response.status(404).end()
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    console.log(user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes || 0,
        url: body.url,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const body = request.body

    const oldBlog = await Blog.findById(request.params.id).populate('user')

    if(!oldBlog)
        response.status(404).end()

    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog)
        response.json(updatedBlog)
    else
        response.status(404).end()
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user

    const blog = await Blog.findById(request.params.id).populate('user')

    if(!blog)
        return response.status(204).end()

    if (!user.blogs.find(b => b.id === blog.id) && blog.user.id !== user.id)
        return response.status(401).json({ error: 'user do not have the permission to remove this blog' })

    await blog.remove()
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    await user.save()
    response.status(204).end()
})

module.exports = blogsRouter