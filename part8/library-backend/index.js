import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import mongoose from 'mongoose'

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import schema from './graphql/schema.js'
import User from './models/user.js'

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT

console.log('connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connection to MongoDB:', error.message)
    })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/'
    })

    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }
        ]
    })

    await server.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null
                if (auth && auth.toLowerCase().startsWith('bearer ')) {
                    const decodedToken = jwt.verify(
                        auth.substring(7),
                        JWT_SECRET
                    )
                    const currentUser = await User.findById(decodedToken.id)
                    return { currentUser }
                }
            }
        })
    )
    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

start()
