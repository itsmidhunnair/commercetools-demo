import { gql } from "@apollo/client";

const userExistQuery = gql`
  mutation CheckIfUserExist($input: UserData) {
    checkUser(input: $input)
  }
`;

const registerUser = gql`
  mutation SignupUser($input: UserRegister!) {
    registerUser(input: $input)
  }
`;

const loginUserQuery = gql`
  mutation LoginUser($token: String!) {
    loginUser(token: $token)
  }
`;

export { userExistQuery, registerUser, loginUserQuery };
