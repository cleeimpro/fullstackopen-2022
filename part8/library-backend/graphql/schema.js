import { makeExecutableSchema } from '@graphql-tools/schema'
import gql from 'graphql-tag'
import _ from 'lodash'

import { typeDef as Author, resolvers as authorResolvers } from './author.js'
import { typeDef as Book, resolvers as bookResolvers } from './book.js'
import { typeDef as Token } from './token.js'
import { typeDef as User, resolvers as userResolvers } from './user.js'

const gqlBase = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }
`

const resolvers = {}

export default makeExecutableSchema({
    typeDefs: [gqlBase, Author, Book, Token, User],
    resolvers: _.merge(resolvers, authorResolvers, bookResolvers, userResolvers)
})
