import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-boost';

const { GATSBY_API_URL } = process.env;

export const client = new ApolloClient({ uri: `${GATSBY_API_URL}/graphql`, fetch });
