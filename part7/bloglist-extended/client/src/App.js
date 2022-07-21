import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Notification from './components/Notification'
import BlogPage from './components/BlogPage'

import { initializeBlogs } from './reducer/blogsReducer'
import { initializeUser } from './reducer/userReducer'
import { initializeUsers } from './reducer/usersReducer'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'
import BlogDetails from './components/BlogDetails'

import { Container } from '@chakra-ui/react'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)

    console.log('user', user)
    console.log('blogs', blogs)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeUsers())
    }, [])

    if (!user) {
        return (
            <>
                <LoginPage />
            </>
        )
    }

    return (
        <div>
            <div>
                <NavBar />
                <Notification />
            </div>

            <Container
                py={{
                    base: '2',
                    lg: '4'
                }}
                maxW="2xl"
            >
                <Routes>
                    <Route path="" element={<BlogPage />} />
                    <Route path="/blogs/:id" element={<BlogDetails />} />
                    <Route path="/blogs" element={<BlogPage />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<h3>route not found</h3>} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
