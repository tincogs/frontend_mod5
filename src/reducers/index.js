import { combineReducers } from 'redux'
import auth from './auth'
import openProjects from './openProjects'
import closedProjects from './closedProjects'
import property from './property'
import user from './user'
import editReducer from './editReducer'
import reportReducer from './reportReducer'
import labels from './labels'
import gmailReducer from './gmailReducer'
import newProjReducer from './newProjReducer'

export default combineReducers({
  auth,
  user,
  openProjects,
  closedProjects,
  property,
  editProject: editReducer,
  reportProjects: reportReducer,
  labels,
  gmails: gmailReducer,
  newProject: newProjReducer
})
