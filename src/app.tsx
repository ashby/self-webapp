
import 'whatwg-fetch';

import React from 'react';
import { Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import memoize from 'lodash/memoize';
import { ApolloProvider } from 'react-apollo';

import Main from './routes/main';
import Login from './routes/login';
import Thoughts from './routes/thoughts';

import './app.scss';

const buildApolloClient = memoize(() =>
    new ApolloClient({
        uri: `${API_URL}/v1/graphql`,
        headers: {
            Authentication: `${localStorage.getItem( 'AUTH_TOKEN' )}`,
        },
    }),
);

export const App = () => (
    <ApolloProvider client={buildApolloClient()}>
        <Router>
            <Main path="/">
                <Login path="login" />
                <Thoughts path="thoughts/*" />
            </Main>
        </Router>
    </ApolloProvider>
);

