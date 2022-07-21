import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    TableContainer
} from '@chakra-ui/react'

const Users = () => {
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    return (
        <TableContainer>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>username</Th>
                        <Th>blogs created</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td>
                                <Link to={`/users/${user.id}`}>
                                    {user.username}
                                </Link>
                            </Td>
                            <Td>
                                {
                                    blogs.filter(b => b.user.id === user.id)
                                        .length
                                }
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default Users
