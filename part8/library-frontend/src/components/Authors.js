import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './../queries'
import BirthyearForm from './BirthyearForm'
import React from 'react'

const Authors = ({ show, token }) => {
    const authorsQueryResult = useQuery(ALL_AUTHORS)

    if (!show) return null

    if (authorsQueryResult.loading) return <div>loading...</div>

    const authors = authorsQueryResult.data.allAuthors || []

    return (
        <div>
            <h2>authors</h2>
            {authors.length > 0 ? (
                <React.Fragment>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>born</th>
                                <th>books</th>
                            </tr>
                            {authors.map(a => (
                                <tr key={a.name}>
                                    <td>{a.name}</td>
                                    <td>{a.born}</td>
                                    <td>{a.bookCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {token && <BirthyearForm />}
                </React.Fragment>
            ) : (
                <div>no authors available</div>
            )}
        </div>
    )
}

export default Authors
