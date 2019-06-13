import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment ProcessData on Process {
        
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
    query($userId: ID!) {
        process(userId: $userId) {
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
