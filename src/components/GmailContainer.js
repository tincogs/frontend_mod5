import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Gmails from './Gmails'

class GmailContainer extends React.Component {
    render() {
        return (
            <div className='tbl container'>
                {this.props.gmails
                ?
               <Gmails history={this.props.history} updateGmails={this.props.updateGmails}/>
                :
               <h5>Gmails Loading...</h5>
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
      gmails: state.gmails
    }
  }

export default connect(mapStateToProps, null)(GmailContainer)