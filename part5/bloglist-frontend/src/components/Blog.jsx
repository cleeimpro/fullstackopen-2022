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
            {blog.author} <br />
            {blog.url} <br />
            {blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button><br />
            {userHasRights && <button onClick={() => removeBlog(blog)}>remove</button>}
        </div>
    )

    return (
        <div style={blogStyle}>
            {blog.title}{' '}
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
