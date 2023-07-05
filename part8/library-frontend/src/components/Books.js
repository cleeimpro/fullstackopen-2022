import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_GENRES, BOOKS_BY_GENRE, BOOK_ADDED } from './../queries'

export const updateBookCache = (cache, addedBook) => {
    const uniqByTitle = allBooks => {
        let seen = new Set()
        return allBooks.filter(item => {
            let title = item.title
            return seen.has(title) ? false : seen.add(title)
        })
    }

    const genres = [...addedBook.genres, 'all']

    genres.forEach(genre => {
        cache.updateQuery(
            {
                query: BOOKS_BY_GENRE,
                variables: { genreToSearch: genre }
            },
            data => {
                if (data)
                    return {
                        allBooks: uniqByTitle([...data.allBooks, addedBook])
                    }
            }
        )
    })
}

const Books = ({ show }) => {
    const [genre, setGenre] = useState('all')
    const genresQueryResult = useQuery(ALL_GENRES)
    const booksQueryResult = useQuery(BOOKS_BY_GENRE, {
        variables: { genreToSearch: genre }
    })

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const addedBook = data.data.bookAdded

            window.alert(`new book added: ${addedBook.title}`)
            updateBookCache(client.cache, addedBook)
        }
    })

    if (!show) return null
    if (genresQueryResult.loading || booksQueryResult.loading)
        return <div>loading...</div>

    const genres = genresQueryResult.data.allGenres || []
    const books = booksQueryResult.data.allBooks || []

    return (
        <div>
            <h2>books</h2>

            {books.length > 0 ? (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>author</th>
                                <th>published</th>
                            </tr>
                            {books.map(a => (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.published}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {genres.map(g => (
                            <button key={g} onClick={() => setGenre(g)}>
                                {g}
                            </button>
                        ))}
                        <button onClick={() => setGenre('all')}>
                            all genres
                        </button>
                    </div>
                </div>
            ) : (
                <div>no books in this library</div>
            )}
        </div>
    )
}

export default Books
