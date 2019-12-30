import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: 'https://1c8bbaa4.ngrok.io/graphql',
  fetch,
})
