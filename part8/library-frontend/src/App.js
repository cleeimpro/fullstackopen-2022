import React from 'react'
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

const App = () => {
    const [page, setPage] = useState('authors')

    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)

    const client = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token)
            setToken(`Bearer ${token}`)
    }, [])

    const logout = () => {
        setToken(null)
        setPage('authors')
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <React.Fragment>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>
                            recommend
                        </button>
                        <button onClick={logout}>logout</button>
                    </React.Fragment>
                )}
                {!token && (
                    <button onClick={() => setPage('login')}>login</button>
                )}
                {error && <p>{error}</p>}
            </div>

            <Authors show={page === 'authors'} token={token} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Recommend show={page === 'recommend'} />

            <Login
                show={page === 'login'}
                setError={setError}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    )
}

export default App
