import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducer/userReducer'
import { Button, HStack, Text } from '@chakra-ui/react'

const UserInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <HStack spacing="3">
            <Text>{user.name} logged in</Text>
            <Button onClick={handleLogout} colorScheme="teal">
                logout
            </Button>
        </HStack>
    )
}

export default UserInfo
