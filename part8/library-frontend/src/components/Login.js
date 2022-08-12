import { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { LOGIN, USER } from './../queries'

const Login = ({ setError, setToken, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [getCurrentUser, { data }] = useLazyQuery(USER, {
        fetchPolicy: 'network-only'
    })

    const [login, result] = useMutation(LOGIN, {
        onError: error => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            console.log('set localstorage token')
            localStorage.setItem('library-user-token', token)
            getCurrentUser()
            console.log('got current user')
            setUsername('')
            setPassword('')
            setPage('authors')
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
    }

    const submit = async event => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={submit}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
