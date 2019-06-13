import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment PathData on Path {
        
    }
`;


const list = gql`
    query($userId: ID!) {
        paths(userId: $userId) {
            ...PathData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($userId: ID!) {
        path(userId: $userId) {
            ...PathData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutatePath($data: PathInput! ) {
        mutatePath( data: $data ) {
            ...PathData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
