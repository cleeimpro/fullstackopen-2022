const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? undefined : blogs.reduce((prev, b) => prev.likes > b.likes ? prev : b)
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}