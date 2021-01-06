
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Checkbox } from 'semantic-ui-react'

const clientId =
'16925787258-d33qvibcs55vegmaumeli330mju7403o.apps.googleusercontent.com';

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