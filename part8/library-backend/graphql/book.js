import gql from 'graphql-tag'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

import Book from '../models/book.js'

const pubsub = new PubSub()

export const typeDef = gql`
    type Book {
        title: String!
        author: Author!
        published: Int
        genres: [String!]!
        id: ID!
    }

    extend type Query {
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]
    }

    extend type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String!]
        ): Book
    }

    extend type Subscription {
        bookAdded: Book!
    }
`

export const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
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
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError(error.message, {
                        invalidArgs: args
                    })
                }
            }

            const book = new Book({ ...args, author })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}
