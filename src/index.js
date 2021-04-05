import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider, createHttpLink, ApolloClient, InMemoryCache} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import App from "./App";

const httpLink = createHttpLink({ uri: 'https://share-here.herokuapp.com/' });

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
