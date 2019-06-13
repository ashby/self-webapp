import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment ThoughtData on Thought {
        thought
        id
        character
        quality
        process
        source
        feeling
        userId
        path
        createdAt
        updatedAt
        amendedAt
        sharedAt
    }
`;


const list = gql`
    query($id: String!) {
        thoughts(userId: $id) {
            ...ThoughtData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($id: String!) {
        thought(id: $id) {
            ...ThoughtData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateThought($data: ThoughtInput! ) {
        mutateThought( data: $data ) {
            ...ThoughtData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
