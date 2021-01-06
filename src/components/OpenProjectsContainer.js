import React from 'react'
import { connect } from 'react-redux'
import { openProjects, closedProjects } from '../actions/data'
import OpenProjects from './OpenProjects'


class OpenProjectsContainer extends React.Component {

    render() {
        return (
            <div className='tbl container'>
              {this.props.projects
                ?
               <OpenProjects history={this.props.history} getProjects={this.props.getProjects}/>
                :
               <h5>Open Projects Table Loading...</h5>
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
      projects: state.openProjects
    }
  }

export default connect(mapStateToProps, { openProjects, closedProjects })(OpenProjectsContainer)