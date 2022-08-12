import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache, ApolloLink
} from '@apollo/client'

const authMiddleware = new ApolloLink((operation, forward) => {

    console.log('set context')
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || null
        }
    }))

    return forward(operation)
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authMiddleware.concat(httpLink)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
