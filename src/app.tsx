
import 'whatwg-fetch';

import React from 'react';
import { Router } from '@reach/router';
import { ApolloProvider } from 'react-apollo';

import Main from './routes/main';
import Login from './routes/login';
import Thoughts from './routes/thoughts';
import './app.scss';

import selfClient from './client';


export const App = () => (
    <ApolloProvider client={selfClient()}>
        <Router>
            <Main path="/">
                <Login path="login" />
                <Thoughts path="thoughts/*" />
            </Main>
        </Router>
    </ApolloProvider>
);

