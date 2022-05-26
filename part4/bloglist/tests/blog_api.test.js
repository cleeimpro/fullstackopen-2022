const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(titles).toContain(
            'React patterns'
        )
    })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect({...resultBlog.body, user: resultBlog.body.user.id}).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'clee',
            url: 'einfach.clefa.media'
        }

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'async/await simplifies making async calls'
        )
    })

    test('fails with status code 401 if no token is provided', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'clee',
            url: 'einfach.clefa.media'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if data invalid', async () => {
        const newBlog = {
            likes: 3
        }

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('update a single blog', () => {
    test('succeeds with status code 200', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedBlog = { ...blogToUpdate, likes: 999 }

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .put(`/api/blogs/${updatedBlog.id}`)
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd.find(b => b.id === updatedBlog.id).likes).toBe(999)
    })


    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .put(`/api/blogs/${invalidId}`)
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .expect(400)
    })

    test('fails with statuscode 401 if no token is provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedBlog = { ...blogToUpdate, likes: 999 }

        await api
            .put(`/api/blogs/${updatedBlog.id}`)
            .send(updatedBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.find(b => b.id === updatedBlog.id).likes).not.toBe(999)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and token is provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'clee', password: 'xerxes' })

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})