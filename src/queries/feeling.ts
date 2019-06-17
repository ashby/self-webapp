import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment FeelingData on Feeling {
        id
        key
        title
        thoughts
        createdAt
        updatedAt
        userId
    }
`;


const list = gql`
    query($userId: ID!) {
        feelings(userId: $userId) {
            ...FeelingData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($key: String!) {
        feeling(key: $key) {
            ...FeelingData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateFeeling($data: FeelingInput! ) {
        mutateFeeling( data: $data ) {
            ...FeelingData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
