import BlogForm from './BlogForm'
import BlogList from './BlogList'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    IconButton,
    Box
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

const BlogPage = () => (
    <Box pos="relativ">
        <Popover>
            <PopoverTrigger>
                <IconButton
                    colorScheme="teal"
                    icon={<AddIcon />}
                    pos="fixed"
                    right="20"
                    bottom="20"
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <BlogForm />
                </PopoverBody>
            </PopoverContent>
        </Popover>

        <BlogList />
    </Box>
)

export default BlogPage
