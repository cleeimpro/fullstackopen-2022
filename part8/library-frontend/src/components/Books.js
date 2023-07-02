import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from './../queries'

const Books = ({ show }) => {
    const [genre, setGenre] = useState('all')
    const result = useQuery(BOOKS_BY_GENRE, {
        variables: { genreToSearch: genre }
    })
    if (!show) return null
    if (result.loading) return <div>loading...</div>

    const books = result.data.allBooks || []
    /*const filteredBooks =
        genre === 'all' ? books : books.filter(b => b.genres.includes(genre))
*/
    const genres = [...new Set(books.flatMap(b => b.genres).filter(Boolean))]

    return (
        <div>
            <h2>books</h2>

            {books.length > 0 ? (
                <>
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
                </>
            ) : (
                <div>no books in this library</div>
            )}
        </div>
    )
}

export default Books
