import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment SourceData on Source {
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
        sources(userId: $id) {
            ...SourceData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($key: String!) {
        source(key: $key) {
            ...SourceData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateSource($data: SourceInput! ) {
        mutateSource( data: $data ) {
            ...SourceData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
