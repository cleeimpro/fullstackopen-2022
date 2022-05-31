import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return initialState
        }
    }
})


export const { setNotification, clearNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

let timer
export const displayNotification = (message, timeout) => {
    return dispatch => {
        dispatch(setNotification(message))
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}