import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

import {
    Box,
    useColorModeValue,
    Container,
    Flex,
    ButtonGroup,
    Button,
    Heading
} from '@chakra-ui/react'

const NavBar = () => {
    return (
        <Box
            as="nav"
            bg={useColorModeValue('white', 'darkgray')}
            boxShadow={useColorModeValue('sm', 'sm-dark')}
        >
            <Container
                py={{
                    base: '2',
                    lg: '4'
                }}
                maxW="4xl"
            >
                <Flex justify="space-between" flex="1">
                    <Heading size="lg">bloglist app</Heading>
                    <ButtonGroup variant="link" spacing="8">
                        <Button>
                            <Link to="/">Blogs</Link>
                        </Button>
                        <Button>
                            <Link to="/users">Users</Link>
                        </Button>
                    </ButtonGroup>
                    <UserInfo />
                </Flex>
            </Container>
        </Box>
    )
}

export default NavBar
