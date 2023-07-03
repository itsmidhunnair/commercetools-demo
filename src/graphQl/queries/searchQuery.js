import { gql } from "@apollo/client";

const getSuggestions = gql`
  query Suggestion($search: String!) {
    suggest(search: $search) {
      text
    }
  }
`;

export { getSuggestions };
