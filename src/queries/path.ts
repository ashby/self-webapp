import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment PathData on Path {
        id
        key
        title
        feelings
        createdAt
        updatedAt
        userId
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
    query($key: String!) {
        path(key: $key) {
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
