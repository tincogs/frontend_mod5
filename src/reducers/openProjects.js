const openProjects = (state=[], action ) => {
  let updatedProjects = []
  switch(action.type){
    case 'OPEN_PROJECTS':
      return action.projects
    case 'UPDATE_PROJECT':
      action.updatedProject.complete
      ?
      updatedProjects = state.filter(p => p.id !== action.updatedProject.id)
      :
      updatedProjects = state.filter(p => p.id !== action.updatedProject.id)
      updatedProjects.push(action.updatedProject)
      return updatedProjects

    case 'NEW_PROJECT':
      action.newProject.complete
      ?
      updatedProjects = state
      :
      updatedProjects = [...state, action.newProject]

      return updatedProjects

    case 'DELETE_PROJECT':
      updatedProjects = state.filter(p => p.id !== action.id)
      return updatedProjects

    case 'CLEAR_OPEN':
      return []
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}


  export default openProjects;