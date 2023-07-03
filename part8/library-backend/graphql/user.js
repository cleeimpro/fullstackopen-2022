import gql from 'graphql-tag'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET


export const typeDef = gql`
    type User {
        username: String!
        favoriteGenre: String
        id: ID!
    }

    extend type Query {
        me: User
        allUsers: [User]
    }

    extend type Mutation {
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

export const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        },
        allUsers: async () => User.find({})
    },
    Mutation: {
        createUser: async (root, args) => {
            const user = new User({ username: args.username })

            return user.save().catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}
