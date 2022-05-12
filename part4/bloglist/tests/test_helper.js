const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: {_id: "627a3c136ac93081da941409"},
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: {_id: "627a3c136ac93081da941409"},
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const initialUsers = [
    {
        _id: "627a3c136ac93081da941409",
        username: "clee",
        name: "Clemens",
        passwordHash: "$2b$10$v6dYAvdCMC5Qk/m63AebjO.8uQ9.CQ7b50WwdKZ25A0mWKqF71pRC",
        blogs: [
            {_id: "5a422a851b54a676234d17f7"},
            {_id: "5a422aa71b54a676234d17f8"} 
        ],
        __v: 0
    },
    {
        _id: "627d58b2e6539b3fc65f74c6",
        username: "demo",
        name: "dedededemon",
        passwordHash: "$2b$10$v6dYAvdCMC5Qk/m63AebjO.8uQ9.CQ7b50WwdKZ25A0mWKqF71pRC",
        blogs: [],
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'asd', author: 'asd', url: 'asd' })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, nonExistingId }