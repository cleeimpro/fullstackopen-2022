import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    Heading,
    Image,
    Container,
    Table,
    TableContainer,
    Tbody,
    Tr,
    Td,
    TableCaption
} from '@chakra-ui/react'

const User = () => {
    const match = useMatch('/users/:id')
    const users = useSelector(state => state.users)
    const user = match ? users.find(user => user.id === match.params.id) : null

    if (!user) return null

    return (
        <Container align="center">
            <Image
                borderRadius="full"
                boxSize="150px"
                src="https://joeschmoe.io/api/v1/random"
                alt="Pravantar"
                border="6px solid teal"
            />
            <Heading>{user.name}</Heading>
            <TableContainer>
                <Table size="sm" variant="striped">
                    <TableCaption>added blogs</TableCaption>
                    <Tbody>
                        {user.blogs.map(blog => (
                            <Tr key={blog.id}>
                                <Td>{blog.title}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default User
