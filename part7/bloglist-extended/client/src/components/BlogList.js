import { useSelector } from 'react-redux'
import Blog from './Blog'
import { TableContainer, Table, Tbody } from '@chakra-ui/react'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    const sortedByLikesBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

    return (
        <TableContainer>
            <Table variant="striped" colorScheme="teal">
                <Tbody>
                    {sortedByLikesBlogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default BlogList
