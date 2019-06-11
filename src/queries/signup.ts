import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment SignUpData on SignUp {
        token
        userId
    }
`;

const mutate = gql`
    mutation SignUp($data: AuthPayload! ) {
        signup( data: $data ) {
            ...SignUpData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ mutate });