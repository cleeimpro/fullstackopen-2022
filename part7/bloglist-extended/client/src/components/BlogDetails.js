import { useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducer/blogsReducer'
import PropTypes from 'prop-types'
import { addComment } from '../reducer/blogsReducer'

import {
    Heading,
    Link,
    Button,
    Flex,
    Tag,
    HStack,
    Text,
    Box,
    Stack,
    Input,
    InputGroup,
    IconButton,
    Table,
    TableContainer,
    Td,
    Tr,
    TableCaption,
    Tbody
} from '@chakra-ui/react'
import { ExternalLinkIcon, AddIcon } from '@chakra-ui/icons'

const Comments = ({ comments, handleComment }) => {
    return (
        <>
            <Heading as="h3" size="md">
                comments
            </Heading>
            <form onSubmit={handleComment}>
                <InputGroup>
                    <Input
                        name="comment"
                        placeholder="new comment"
                        borderTopRightRadius="0"
                        borderBottomRightRadius="0"
                    />
                    <IconButton
                        borderTopLeftRadius="0"
                        borderBottomLeftRadius="0"
                        colorScheme="teal"
                        type="submit"
                        icon={<AddIcon />}
                    />
                </InputGroup>
            </form>
            <TableContainer>
                <Table variant="striped" colorScheme="gray">
                    <TableCaption>{comments.length} comments</TableCaption>
                    <Tbody>
                        {comments.map((comment, ind) => {
                            if (!comment) return null
                            return (
                                <Tr key={ind}>
                                    <Td>{comment}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    handleComment: PropTypes.func.isRequired
}

const BlogDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const match = useMatch('/blogs/:id')
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    if (!blog) return null

    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
    const own = blog.user.id === user.id

    const handleRemove = async id => {
        const toRemove = blogs.find(b => b.id === id)

        const ok = window.confirm(
            `remove '${toRemove.title}' by ${toRemove.author}?`
        )

        if (!ok) {
            return
        }

        await dispatch(removeBlog(id))
        navigate('/')
    }

    const handleLike = async id => {
        dispatch(likeBlog(id))
    }

    const handleComment = async e => {
        e.preventDefault()
        const comment = e.target.comment.value
        dispatch(addComment(blog.id, comment))
    }

    return (
        <>
            <Stack spacing="3">
                <Heading size="lg">{blog.title}</Heading>
                <Flex justifyContent="space-between">
                    <HStack spacing="1">
                        <Text>created by </Text>
                        <Tag colorScheme="teal" variant="solid">
                            {addedBy}
                        </Tag>
                    </HStack>
                    <Link isExternal href={blog.url}>
                        {blog.url} <ExternalLinkIcon mx="2px" />
                    </Link>
                </Flex>
                <Box>
                    {blog.likes} likes{' '}
                    <Button
                        leftIcon={<AddIcon />}
                        onClick={() => handleLike(blog.id)}
                        colorScheme="green"
                    >
                        like blog
                    </Button>
                    {own && (
                        <Button
                            onClick={() => handleRemove(blog.id)}
                            colorScheme="red"
                        >
                            remove blog
                        </Button>
                    )}
                </Box>
                <Comments
                    comments={blog.comments}
                    handleComment={handleComment}
                />
            </Stack>
        </>
    )
}

export default BlogDetails
