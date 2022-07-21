import { createSlice } from '@reduxjs/toolkit'
import { displayNotification } from './notificationReducer'
import loginService from '../services/login'

const STORAGE_KEY = 'loggedBlogAppUser'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser() {
            return null
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username,
                password
            })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            dispatch(setUser(user))
            dispatch(
                displayNotification(`${user.name} logged in!`, 'info', 5000)
            )
        } catch (error) {
            dispatch(
                displayNotification('wrong username/password', 'alert', 5000)
            )
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(removeUser())
        localStorage.removeItem(STORAGE_KEY)
    }
}
