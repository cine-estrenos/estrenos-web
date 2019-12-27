import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

// Apollo Client
import { client } from './client'

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
