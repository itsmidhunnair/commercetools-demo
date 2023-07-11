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

const registerUserWithGoogleQuery = gql`
  mutation registerUserWithGoogle($token: String!) {
    registerGoogleUser(token: $token)
  }
`;

export {
  userExistQuery,
  registerUser,
  loginUserQuery,
  registerUserWithGoogleQuery,
};
