export const SIGN_IN = `
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      authenticationModel {
        accessToken
        email
        refreshToken
        roles
      }
      errors {
        code
        message
      }
    }
  }
`;

export const REFRESH_TOKEN = `
  query RefreshToken($refreshToken: String!) {
    refreshToken(
      input: {
        refreshToken: $refreshToken"
      }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGN_OUT = `
  mutation {
    signOut {
      signOutModel {
        id
      }
    }
  }
`;

export const ME = `
  mutation Me($refreshToken: String!) {
    me(input: { refreshToken: $refreshToken }) {
      authenticationModel {
        accessToken
        email
        refreshToken
        roles
      }
      errors {
        code
        message
      }
    }
  }
`;
