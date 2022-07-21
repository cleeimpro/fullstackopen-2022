import { createSlice } from '@reduxjs/toolkit'
import blogService from './../services/blogs'
import { displayNotification } from './notificationReducer'

const blogsReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const blogToUpdate = action.payload
            const id = action.payload.id
            return state.map(blog => (blog.id !== id ? blog : blogToUpdate))
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
    blogsReducer.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, author, url) => {
    return async (dispatch, getState) => {
        try {
            const newBlog = await blogService.create(
                {
                    title,
                    author,
                    url,
                    likes: 0
                },
                getState().user.token
            )
            dispatch(appendBlog(newBlog))
            dispatch(
                displayNotification(
                    `a new blog '${newBlog.title}' by ${newBlog.author} added`,
                    'info',
                    5000
                )
            )
        } catch (error) {
            dispatch(
                displayNotification(
                    'creating a blog failed: ' + error.response.data.error,
                    'alert',
                    5000
                )
            )
        }
    }
}

export const likeBlog = id => {
    return async (dispatch, getState) => {
        const blog = { ...getState().blogs.find(blog => blog.id === id) }
        blog.likes = blog.likes + 1 || 0
        const updatedBlog = await blogService.update(
            id,
            blog,
            getState().user.token
        )
        dispatch(updateBlog(updatedBlog))
        displayNotification(
            `you liked '${updatedBlog.title}' by ${updatedBlog.author}`,
            'info',
            5000
        )
    }
}

export const removeBlog = id => {
    return async (dispatch, getState) => {
        await blogService.remove(id, getState().user.token)
        dispatch(deleteBlog(id))
        dispatch(displayNotification('removed blog', 'info', 5000))
    }
}

export const addComment = (id, comment) => {
    return async (dispatch, getState) => {
        console.log(comment)
        const updatedBlog = await blogService.comment(
            id,
            { comment },
            getState().user.token
        )
        dispatch(updateBlog(updatedBlog))
    }
}

export default blogsReducer.reducer
