import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment EmotionData on Emotion {
        id
        key
        title
        createdAt
        updatedAt
        userId
    }
`;


const list = gql`
    query($userId: ID!) {
        emotions(userId: $userId) {
            ...EmotionData
        }
    }
    ${Fragment}
`;

const get = gql`
    query($key: String!) {
        emotion(key: $key) {
            ...EmotionData
        }
    }
    ${Fragment}
`;

const mutate = gql`
    mutation MutateEmotion($data: EmotionInput! ) {
        mutateEmotion( data: $data ) {
            ...EmotionData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ get, list, mutate });
