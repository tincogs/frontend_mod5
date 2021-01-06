const gmails = (state=[], action ) => {
    switch(action.type){
      case 'GET_GMAILS':
        return [...state, action.gmails]
      case 'CLEAR_GMAILS':
        return []
      case 'LOGOUT_USER':
        return []
      default:
        return state
    }
  }


  export default gmails;