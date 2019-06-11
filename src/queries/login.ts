import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment LoginData on Login {
        token
        userId
    }
`;

const mutate = gql`
    mutation Login($data: AuthPayload! ) {
        login( data: $data ) {
            ...LoginData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ mutate });