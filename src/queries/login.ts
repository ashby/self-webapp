import gql from 'graphql-tag';

const mutate = gql`
    mutation Login( $email: String!, $password: String! ) {
        login( email: $email, password: $password ) {
            token
            userId
        }
    }
`;

export default mutate;
