import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
    <div>
        <div>{anecdote.content}</div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
    </div>
)

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => {
        const anecdotes = state.anecdotes.slice()
        if (state.filter)
            return anecdotes
                .filter((a) =>
                    a.content.toLowerCase().includes(state.filter.toLowerCase())
                )
        return anecdotes
    })

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(displayNotification(`you voted '${anecdote.content}'`, 5000))
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => vote(anecdote)}
                />
            ))}
        </div>
    )
}

export default AnecdoteList
