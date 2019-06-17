import ApolloClient from 'apollo-boost';
import memoize from 'lodash/memoize';
import { CONFIG } from './config';
import './app.scss';

const buildApolloClient = memoize(() =>
    new ApolloClient({
        uri: `${CONFIG.API_URL}/v1/graphql`,
        headers: {
            Authorization: `${localStorage.getItem( CONFIG.AUTH_TOKEN )}`,
        },
    }),
);

//const selfClient = buildApolloClient();
export default buildApolloClient;
