import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const Providers = ({ children }) => {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};

export default Providers;
