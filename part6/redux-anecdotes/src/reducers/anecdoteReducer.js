import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        updateAnecdote(state, action) {
            const anecdoteToUpdate = action.payload
            const id = action.payload.id
            return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteToUpdate)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    }
})

export const {appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes+1})
        dispatch(updateAnecdote(votedAnecdote))
    }
}

export default anecdoteSlice.reducer