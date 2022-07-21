import { useDispatch } from 'react-redux'
import { createBlog } from '../reducer/blogsReducer'

import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack
} from '@chakra-ui/react'

const BlogForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        dispatch(createBlog(title, author, url))
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    return (
        <Stack spacing="6">
            <Heading size="md">Create new</Heading>

            <form onSubmit={handleSubmit}>
                <Stack spacing="5">
                    <FormControl>
                        <FormLabel htmlFor="title">title</FormLabel>
                        <Input id="title" type="text" placeholder="title" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="author">author</FormLabel>
                        <Input id="author" type="text" placeholder="author" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="url">url</FormLabel>
                        <Input id="url" type="text" placeholder="url" />
                    </FormControl>
                </Stack>
                <Button type="submit" colorScheme="teal">
                    create
                </Button>
            </form>
        </Stack>
    )
}

export default BlogForm
