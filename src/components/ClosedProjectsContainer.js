import React from 'react'
import { connect } from 'react-redux'
import { closedProjects } from '../actions/data'
import ClosedProjects from './ClosedProjects'


class ClosedProjectsContainer extends React.Component {

    render() {
        return (
            <div className='tbl container'>
              {this.props.projects
                ?
               <ClosedProjects history={this.props.history}/>
                :
               <h5>Closed Projects Loading...</h5>
              }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      user: state.user,
      property: state.property,
      projects: state.closedProjects
    }
  }

export default connect(mapStateToProps, { closedProjects })(ClosedProjectsContainer)