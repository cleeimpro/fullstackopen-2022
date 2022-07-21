import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notificationReducer'
import userReducer from './reducer/userReducer'
import usersReducer from './reducer/usersReducer'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer
    }
})

export default store
