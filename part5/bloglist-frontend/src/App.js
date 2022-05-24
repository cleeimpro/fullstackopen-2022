import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const localUser = window.localStorage.getItem('userBloglist')
        if (localUser) {
            const user = JSON.parse(localUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const notify = (message, type = 'info') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('userBloglist')
        setUser(null)
        blogService.setToken(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password, })
            setUser(user)
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
            window.localStorage.setItem('userBloglist', JSON.stringify(user))
        } catch (exception) {
            notify('Wrong username or password', 'err')
            console.error(exception)
        }
    }

    const addBlog = async (newBlog) => {
        try {
            const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
            blogFormRef.current.toggleVisibility()
        } catch (error) {
            console.error(error)
        }
    }

    const likeBlog = async (blog) => {
        try {
            const returnedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 }, blog.id)
            setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
            notify(`blog ${returnedBlog.title} by ${returnedBlog.author} liked`)
        } catch (error) {
            console.error(error)
        }
    }

    const removeBlog = async (blog) => {
        if (!window.confirm('Remove Blog?'))
            return
        try {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
            notify(`blog ${blog.title} by ${blog.author} removed`)
        } catch (error) {
            console.error(error)
        }
    }

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <div>
                <span>{user.name} logged in</span>
                <button onClick={handleLogout}>logout</button>
            </div>

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            {blogs.sort((a, b) => a.likes < b.likes).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} userHasRights={blog.user.id === user.id} />
            )}
        </div>
    )

    return (
        <div>
            <h1>BLOGapp</h1>
            <Notification notification={notification} />
            {user === null && <LoginForm
                handleSubmit={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password} />}
            {user !== null && blogList()}
        </div>
    )
}

export default App
