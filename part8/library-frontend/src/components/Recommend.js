import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from './../queries'

const Recommend = ({ show }) => {
    const allBooks = useQuery(ALL_BOOKS)
    const user = useQuery(USER)
    
    if (!show) return null
    if (allBooks.loading || user.loading) return <div>loading...</div>

    const books = allBooks.data.allBooks || []
    const favoriteGenre = user.data.me?.favoriteGenre || 'all'
    const filteredBooks =
        favoriteGenre === 'all'
            ? books
            : books.filter(b => b.genres.includes(favoriteGenre))

    return (
        <div>
            <h2>Recommendations</h2>

            <div>
                books in your favorite genre <b>{favoriteGenre}</b>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
