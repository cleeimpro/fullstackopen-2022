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

<<<<<<< HEAD
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
=======
    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors(genre: String): [Author!]
        me: User
        allUsers: [User]
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String!]
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filteredBooks = await Book.find({}).populate('author')
            if (args.author)
                filteredBooks = filteredBooks.filter(
                    book => book.author.name === args.author
                )
            if (args.genre && args.genre !== 'all')
                filteredBooks = filteredBooks.filter(book =>
                    book.genres.includes(args.genre)
                )
            return filteredBooks
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        },
        allUsers: async () => User.find({}),
    },
    Author: {
        bookCount: async root => Book.find({ author: root.id }).countDocuments()
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
>>>>>>> 85236a1442dca674b2370e68546285dad8d6eeed
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
