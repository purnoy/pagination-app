import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
    query Cha($page: Int!) {
        characters(page: $page) {
            results {
                id
                name
                status
                gender
            }
        }
    }
`;
