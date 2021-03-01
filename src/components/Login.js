import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import { connect } from 'react-redux'
import { loginSuccess, currentUser } from '../actions/auth'
import {Button} from 'semantic-ui-react'

const LOGIN_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const LOGIN_DISCOVERY_DOCS = process.env.REACT_APP_DISCOVERY_DOCS
const LOGIN_SCOPES = process.env.REACT_APP_SCOPES


class Login extends React.Component {



   onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    this.props.loginSuccess(res.tokenObj, res.tokenId, res.isSignedIn())
    this.props.currentUser(res.profileObj.email)
    this.props.history.push('/dashboard')
    refreshTokenSetup(res);
   };

   onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 `
    );
   };
   render () {
      return (
        <div className='login'>
          <i className={`building icon massive`} />
          <h1>Real Reports</h1>
          <h3>Real Estate Project Management & Reporting</h3>
          <div>
          <GoogleLogin
            scope={LOGIN_SCOPES}
            clientId={LOGIN_CLIENT_ID}
            render={renderProps => (
              <Button color='green' content='Login' icon={{name:'google', color:'white'}} onClick={renderProps.onClick} disabled={renderProps.disabled}></Button>
            )}
            buttonText="Login"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
            offline='code'
            discoveryDocs={LOGIN_DISCOVERY_DOCS}
          />
          </div>
        </div>
      );
   }
}

const mapDispatchToProps = {
    loginSuccess: loginSuccess,
    currentUser: currentUser
  }

  export default connect(null, mapDispatchToProps)(Login)