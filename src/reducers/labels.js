const labels = (state=[], action ) => {
    switch(action.type){
      case 'GET_LABELS':
        return action.labels
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }


  export default labels;