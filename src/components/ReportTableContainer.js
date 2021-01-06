import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closedProjects } from '../actions/data'
import ReportTable from './ReportTable'


class ReportTableContainer extends React.Component {

    render() {
        return (
            <div className='tbl container'>
              {this.props.projects
                ?
               <ReportTable history={this.props.history} data={this.props.projects}/>
                :
               <h5>Project Report Loading...</h5>
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
      projects: state.reportProjects
    }
  }

export default connect(mapStateToProps, { closedProjects })(ReportTableContainer)