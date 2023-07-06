import { gql } from "@apollo/client";

const userExistQuery = gql`
  mutation Mutation($input: UserData) {
    checkUser(input: $input)
  }
`;

const registerUser = gql`
  mutation Mutation($token: String!) {
    registerUser(token: $token)
  }
`;

export { userExistQuery, registerUser };
