import { gql } from "@apollo/client";

const userExistQuery = gql`
  mutation Mutation($input: UserData) {
    checkUser(input: $input)
  }
`;

const registerUser = gql`
  mutation Mutation($input: AuthInputs!) {
    registerUser(input: $input)
  }
`;

const loginUserQuery = gql`
  mutation Mutation($input: AuthInputs!) {
    loginUser(input: $input)
  }
`;

export { userExistQuery, registerUser, loginUserQuery };
