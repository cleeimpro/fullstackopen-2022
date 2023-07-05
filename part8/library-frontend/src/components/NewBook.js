import React from 'react'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from './../queries'
import { updateBookCache } from './Books'

const NewBook = ({ show }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            { query: ALL_BOOKS },
            { query: ALL_AUTHORS },
            { query: ALL_GENRES }
        ],
        update: (cache, response) => {
            const addedBook = response.data.addBook
            updateBookCache(cache, addedBook)
        },
        onError: error => console.error(error)
    })

    if (!show) return null

    const submit = async event => {
        event.preventDefault()

        createBook({
            variables: {
                title,
                author,
                published: published !== '' ? Number(published) : null,
                genres
            }
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres([...genres, genre])
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
