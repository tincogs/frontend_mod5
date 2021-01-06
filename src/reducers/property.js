const property = (state=null, action ) => {
    switch(action.type){
      case 'CURRENT_PROPERTY':
        return action.property
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }


  export default property;