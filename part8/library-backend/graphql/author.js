import gql from 'graphql-tag'

import Author from '../models/author.js'

export const typeDef = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    extend type Query {
        authorCount: Int!
        allAuthors(genre: String): [Author!]
    }

    extend type Mutation {
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

export const resolvers = {
    Author: {
        bookCount: async root =>  root.books.length
    },
    Query: {
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}).populate('books')
    },
    Mutation: {
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
            return author
        }
    }
}
