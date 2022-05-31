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
        if (state.filter)
            return state.anecdotes.filter((a) =>
                a.content.toLowerCase().includes(state.filter.toLowerCase())
            )
        return state.anecdotes
    })
    
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(
                            displayNotification(
                                `you liked '${anecdote.content}'`,
                                5000
                            )
                        )
                    }}
                />
            ))}
        </div>
    )
}

export default AnecdoteList
