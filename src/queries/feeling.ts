import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment FeelingData on Feeling {
        
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
    query($userId: ID!) {
        feeling(userId: $userId) {
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
