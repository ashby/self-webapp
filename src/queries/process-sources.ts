import gql from 'graphql-tag';
import GqlResource from '../util/gql-resource';

const Fragment = gql`
    fragment ProcessSourcesData on Source {
        key
        title
    }
`;


const list = gql`
    query($key: String!) {
        processSources(key: $key) {
            ...ProcessSourcesData
        }
    }
    ${Fragment}
`;

export default new GqlResource({ list });
