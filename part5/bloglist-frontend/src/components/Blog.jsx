import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, userHasRights }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const [showContent, setShowContent] = useState(false)

    const toggleShow = () => {
        setShowContent(!showContent)
    }

    const content = () => (
        <div>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></div>
            <div>{userHasRights && <button onClick={() => removeBlog(blog)}>remove</button>}</div>
        </div>
    )

    return (
        <div style={blogStyle} className='blog'>
            <b>{blog.title}</b> by {blog.author}
            <button onClick={toggleShow}>
                {showContent ? 'hide' : 'show'}
            </button>
            {showContent && content()}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired, removeBlog: PropTypes.func.isRequired,
    userHasRights: PropTypes.bool
}

export default Blog
