import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth'
import Logout from './Logout';

class Navbar extends React.Component {

  render() {
    return (
      <div className={`ui inverted menu`} style={{background:'#022140', color:'#e0effe'}}>
        <Link to='/dashboard' className="item">
          <h2 className="ui header">
            <i className={`${this.props.icon} icon`} style={{color:'#2D5F5D'}}/>
            <div className="content" style={{color:'#e0effe'}}>{this.props.title}</div>
            <div className="sub header" style={{color:'#265077'}}>{this.props.description}</div>
          </h2>
        </Link>
        {this.props.auth
          ?
        <div className="right menu">
          {/* <div className="item">
               <Link to='/dashboard' className="item">
                link
              </Link>
          </div>
          <div className="item">
               <Link to='/reports/new' className="item">
                New Report
              </Link>
          </div> */}
          <div className="item" >
               <Link to='/projects/new' >
                New Project
              </Link>
          </div>
          <div className="item">
               <Logout />
          </div>
        </div>
          :
        <p />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { logoutUser })(Navbar)