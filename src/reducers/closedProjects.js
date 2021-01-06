const closedProjects = (state=[], action ) => {
    let updatedProjects = []
    switch(action.type){
      case 'CLOSED_PROJECTS':
        return action.projects
      case 'UPDATE_PROJECT':
        action.updatedProject.complete
        ?
        updatedProjects = [...state, action.updatedProject]
        :
        updatedProjects = state

        return updatedProjects

      case 'NEW_PROJECT':
        action.newProject.complete
        ?
        updatedProjects = [...state, action.newProject]
        :
        updatedProjects = state

        return updatedProjects

      case 'CLEAR_CLOSED':
        return []
      // case 'ADD_TO_REPORT':
      //     updatedProjects = state.map(project => {
      //       if(project.id === action.projectToAdd.id){
      //         return action.projectToAdd
      //       } else {
      //         return project
      //       }
      //     })
      //   return updatedProjects
      case 'LOGOUT_USER':
        return null
      default:
        return state
    }
  }


    export default closedProjects;