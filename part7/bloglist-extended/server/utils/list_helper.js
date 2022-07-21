const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => _.sumBy(blogs, b => b.likes)

const favoriteBlog = (blogs) => _.maxBy(blogs, b => b.likes)

const mostBlogs = (blogs) => _.chain(blogs)
    .groupBy('author')
    .map((group, author) => ({ author, blogs: group.length }))
    .maxBy(o => o.blogs)
    .value()

const mostLikes = (blogs) => _.chain(blogs)
    .groupBy('author')
    .map((group, author) => ({author, likes : _.sumBy(group, b => b.likes)}))
    .maxBy(o => o.likes)
    .value()

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}