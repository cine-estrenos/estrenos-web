import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({ uri: process.env.GATSBY_API_URL, fetch });
