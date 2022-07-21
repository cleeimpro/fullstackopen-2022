import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    styles: {
        global: props => ({
            body: {
                bg: mode('#eee', '#333')(props)
            }
        })
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <App bg="tomato" />
            </Router>
        </Provider>
    </ChakraProvider>
)
