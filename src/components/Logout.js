
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Checkbox } from 'semantic-ui-react'

const clientId = process.env.REACT_APP_CLIENT_ID


class Logout extends React.Component {
    onSuccess = () => {
        console.log('Logout made successfully');
        // alert('You have been logged out ✌');
        this.props.history.push('/login')
        this.props.logoutUser()
    };

    render () {
      return (
        <div>
          <GoogleLogout
            clientId={clientId}
            render={renderProps => (
              <Button color='green' content='Logout' icon={{name:'google', color:'white'}} onClick={renderProps.onClick} disabled={renderProps.disabled}></Button>
            )}
            buttonText="Logout"
            onLogoutSuccess={this.onSuccess}
          ></GoogleLogout>
        </div>
      );
    }
}

const mapDispatchToProps = {
    logoutUser: logoutUser
  }

  export default connect(null, mapDispatchToProps)(withRouter(Logout))