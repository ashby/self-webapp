import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment ProcessData on Process {
        id
        key
        title
        sources
        createdAt
        updatedAt
        userId
    }
`;


const list = gql`
    query($userId: ID!) {
        processs(userId: $id) {
            ...ProcessData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($key: String!) {
        process(key: $key) {
            ...ProcessData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateProcess($data: ProcessInput! ) {
        mutateProcess( data: $data ) {
            ...ProcessData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
