const { gql } = require('@apollo/client')

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        genres
    }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int
        $genres: [String!]
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author{
                name
            }
            published
            genres
            id
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
    query booksByGenre($genreToSearch: String!){
        allBooks(genre: $genreToSearch) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded{
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`
