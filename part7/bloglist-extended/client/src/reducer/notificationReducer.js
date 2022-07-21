import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const { setNotification, clearNotification, removeNotification } =
    notificationSlice.actions
export default notificationSlice.reducer

let timer
export const displayNotification = (message, type, timeout) => {
    return dispatch => {
        dispatch(setNotification({ message, type: type || 'info' }))
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}
