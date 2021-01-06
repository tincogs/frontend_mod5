const editReducer = (state=null, action) => {
    switch(action.type){
      case 'EDIT_PROJECT':
        return action.editedProject
      case 'CLEAR_EDIT':
        return null
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }

  export default editReducer