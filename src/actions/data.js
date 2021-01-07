export const currentProperty= (property) => {
    return {
      type: 'CURRENT_PROPERTY',
      property
    }
  }

  export const openProjects= (projects) => {
    return {
      type: 'OPEN_PROJECTS',
      projects
    }
  }

  export const closedProjects= (projects) => {
    return {
      type: 'CLOSED_PROJECTS',
      projects
    }
  }

  export const editProject = (editedProject) => {
    return {
      type: 'EDIT_PROJECT',
      editedProject
    }
  }

  export const newProject = (newProject) => {
    return {
      type: 'NEW_PROJECT',
      newProject
    }
  }

  export const addToReport = (projectsToAdd) => {
    return {
      type: 'ADD_TO_REPORT',
      projectsToAdd
    }
  }

  export const getLabels = (labels) => {
    return {
      type: 'GET_LABELS',
      labels
    }
  }

  export const getGmails = (gmails) => {
    return {
      type: 'GET_GMAILS',
      gmails
    }
  }

  export const clearGmails = () => {
    return {
      type: 'CLEAR_GMAILS'
    }
  }

  export const clearEdit = () => {
    return {
      type: 'CLEAR_EDIT'
    }
  }

  export const newGmailProj = (gmailObj) => {
    return {
      type: 'NEW_GMAIL_PROJECT',
      gmailObj
    }
  }

  export const updateProject = (updatedProject) => {
    return {
      type: 'UPDATE_PROJECT',
      updatedProject
    }
  }

  export const quickCloseAction = (project) => {
    return {
      type: 'QUICK_CLOSE',
      project
    }
  }

  export const deleteProject = (id) => {
    return {
      type: 'DELETE_PROJECT',
      id
    }
  }

  export const clearOpen = () => {
    return {
      type: 'CLEAR_OPEN'
    }
  }

  export const clearClosed = () => {
    return {
      type: 'CLEAR_CLOSED'
    }
  }