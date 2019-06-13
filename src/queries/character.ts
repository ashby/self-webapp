import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment CharacterData on Character {
        id
        key
        title
        description
        process
        createdAt
        updatedAt
        userId
    }
`;


const list = gql`
    query($userId: ID!) {
        characters(userId: $userId) {
            ...CharacterData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($userId: ID!) {
        character(userId: $userId) {
            ...CharacterData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateCharacter($data: CharacterInput! ) {
        mutateCharacter( data: $data ) {
            ...CharacterData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
