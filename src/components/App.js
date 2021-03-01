import '../App.css';
import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';
// import Login from './Login';
import Login from './Login';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import NewProjectForm from './NewProjectForm';
import ProjectEditForm from './ProjectEditForm';
import ClosedProjectsContainer from './ClosedProjectsContainer';
import { currentUser } from '../actions/auth'
import ReportPDF from './ReportPDF';


class App extends React.Component {
  componentDidMount(){
    let loggedIn = false;

    if (this.props.auth) {loggedIn = this.props.auth.signedIn}

    if (loggedIn === false) {
      this.props.history.push('/login')
    }
  }

  render(){
    return (
        <div>
        <Navbar icon="building" title="Real Reports" description="Project Management & Reporting" />
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='/projects/edit' component={ProjectEditForm} />
            <Route exact path='/projects/new' component={NewProjectForm} />
            <Route exact path='/reports/new' component={ReportPDF} />
          </Switch>
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { currentUser })(withRouter(App))
