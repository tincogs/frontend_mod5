const auth = (state=null, action ) => {
    switch(action.type){
      case 'LOGIN_SUCCESS':
        return {
            tokenObj: action.tokenObj,
            tokenId: action.tokenId,
            isSignedIn: action.signedIn
        }
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }


  export default auth;