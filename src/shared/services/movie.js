import gql from "graphql-tag";

export const GET_MOVIES =gql`
query{
    movies{
      id
      name
      description
      added
      poster
      rating
    }
}
`;

export const GET_MOVIES_SEARCH =gql`

query search($input: String!) {
    search(input: $input) {
        id
        name
        description
        added
        poster
        rating
    }
}
`;

export const UPDATE_MOVIE =gql`

mutation update($id:String!,$input:MovieInput! ) {
    update(id:$id, input: $input) {
        id
        added
    }
}
`;