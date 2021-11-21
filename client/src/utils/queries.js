import gql from 'graphql-tag'

export const QUERY_GET_ME = gql`
    query me {
        _id
        username
        email
        bookCount
        savedBooks
    }
`