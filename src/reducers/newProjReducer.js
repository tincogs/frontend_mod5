const newProjReducer = (state=null, action) => {
    switch(action.type){
      case 'NEW_GMAIL_PROJECT':
        return action.gmailObj
      case 'CLEAR_NEW':
        return null
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }

  export default newProjReducer