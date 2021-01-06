export const loginSuccess = (tokenObj, tokenId, signedIn) => {
    return {
      type: 'LOGIN_SUCCESS',
      tokenObj,
      tokenId,
      signedIn
    }
  }

  export const currentUser= (user) => {
    return {
      type: 'CURRENT_USER',
      user
    }
  }

  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER'
    }
  }