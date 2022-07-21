import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer

export const initializeUsers = () => {
    return async dispatch => {
        const response = await axios.get('/api/users')
        dispatch(setUsers(response.data))
    }
}
