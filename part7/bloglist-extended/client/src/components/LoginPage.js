import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducer/userReducer'

import Notification from './Notification'

import {
    Container,
    Heading,
    useBreakpointValue,
    useColorModeValue,
    FormControl,
    Stack,
    FormLabel,
    Input,
    Box,
    Button
} from '@chakra-ui/react'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        await dispatch(login(username, password))
        event.target.username.value = ''
        event.target.password.value = ''
        navigate('/')
    }

    return (
        <Container
            maxW="lg"
            py={{ base: '12', md: '24' }}
            px={{ base: '0', sm: '8' }}
        >
            <Stack spacing="8">
                <Stack textAlign="center">
                    <Heading
                        size={useBreakpointValue({ base: 'md', md: 'lg' })}
                    >
                        Log in to your account
                    </Heading>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({
                        base: 'transparent',
                        sm: 'white'
                    })}
                    boxShadow={{
                        base: 'none',
                        sm: useColorModeValue('md', 'md-dark')
                    }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="username">
                                        Username
                                    </FormLabel>
                                    <Input id="username" type="text" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <Input id="password" type="password" />
                                </FormControl>
                            </Stack>
                            <Notification />
                            <Button colorScheme="teal" type="submit">
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    )
}

export default LoginPage
