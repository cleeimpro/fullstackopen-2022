import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ''
        dispatch(createAnecdote(content))
        dispatch(displayNotification(`you added '${content}'`, 5000))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    Content:{' '}
                    <input type="text" name="content" placeholder="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
