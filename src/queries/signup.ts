import gql from 'graphql-tag';

const mutate = gql`
    mutation SignUp( $email: String!, $password: String! ) {
        signup( email: $email, password: $password ) {
            token
            userId
        }
    }
`;

export default mutate;
