const reportReducer = (state=[], action) => {
  let updatedProjects = []
    switch(action.type){
      case 'ADD_TO_REPORT':
        updatedProjects = action.projectsToAdd
        return updatedProjects
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }

  export default reportReducer