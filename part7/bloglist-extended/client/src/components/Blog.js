import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { Tr, Td } from '@chakra-ui/react'

const Blog = ({ blog }) => (
    <Tr>
        <Td>
            <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
            </Link>
        </Td>
    </Tr>
)

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired
        }),
        id: PropTypes.string.isRequired
    }).isRequired
}

export default Blog
