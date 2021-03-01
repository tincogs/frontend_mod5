import React from 'react';

import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'
import { currentProperty, openProjects, closedProjects, getLabels, getGmails, clearGmails, clearOpen, clearClosed } from '../actions/data'
import GmailContainer from './GmailContainer'
import OpenProjectsContainer from './OpenProjectsContainer'
import ClosedProjectsContainer from './ClosedProjectsContainer'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_API_KEY
const DISCOVERY_DOCS = process.env.REACT_APP_DISCOVERY_DOCS
const SCOPES = process.env.REACT_APP_SCOPES

class Dashboard extends React.Component {

  state = {
    messages: []
  }

  getGmails = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.load('gmail', 'v1', () => {
        console.log('Loaded Gmail');
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
      })
      .then(window.gapi.client.gmail.users.labels.list({
        'userId': 'me'
      }).then((labelRes) => {
        this.props.getLabels(labelRes.result.labels)
      })
      .then(window.gapi.client.gmail.users.messages.list({
              'userId':'me',
              'labelIds': [
                'INBOX'
              ]
            }).then((response) => {
              // console.log(window.gapi.client)
              const messages = response.result.messages ? response.result.messages : []
              // console.log(messages)
              messages.forEach((msg) => {
                window.gapi.client.gmail.users.messages.get({
                  'userId':'me',
                  'id': `${msg.id}`,
                })
                .then((msgresponse) => {
                  // console.log(msgresponse)
                  const gLabels = this.props.labels
                  const msgLabels = msgresponse.result.labelIds.filter(l => l.includes('Label_'))
                  const msgCategories = msgLabels.map((l) => {
                    let labelName = gLabels.find(({ id }) => id === l).name
                    return labelName
                  })
                  // console.log(msgCategories)
                  const subCats = msgCategories.filter(c => c.includes('/'))
                  let finalSubs = [];
                  if (subCats) {finalSubs = subCats.map((s) => {return s.split('/')[1]})}
                  const msgCat = msgCategories.filter(c => !c.includes('/'))
                  const dt = new Date(msgresponse.result.payload.headers.find( ({ name }) => name === 'Date' ).value)
                  const dateOutput = dt.getMonth( ) + 1 + '/' + dt.getDate( ) + '/' + dt.getFullYear( ) + ' ' + dt.getHours() + ':' + dt.getMinutes() + `${dt.getHours() < 12 ? ' AM' : ' PM'}`
                  const sender = msgresponse.result.payload.headers.find( ({ name }) => name === 'From' ).value
                  const subject = msgresponse.result.payload.headers.find( ({ name }) => name === 'Subject' ).value
                  const body = msgresponse.result.snippet
                  // console.log(msgresponse)
                  const emailObj = {
                    date: dateOutput,
                    category: msgCat,
                    subCategory: finalSubs,
                    sender: sender,
                    subject: subject,
                    body: body.replace(/&#39;/g, "'")
                  }

                  // console.log(emailObj)

                  this.props.getGmails(emailObj)
                  // console.log(finalSubs, "subCats")
                  // console.log(msgCat, "msgCat")
                  // this.props.getGmails(msgresponse.result)
                })
              })
            })
          )
        )
      })
    })
  }

  getProjects = () => {
    if(!this.props.property){
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.user)
      }
      fetch('http://localhost:5000/users', reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.currentUser(data)
        this.props.currentProperty(data.properties)
        const propertyObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data.properties[0].id)
        }
        fetch('http://localhost:5000/properties', propertyObj)
        .then(resp => resp.json())
        .then(data => {
          let open = data.projects.filter(p => {return !p.complete})
          let closed = data.projects.filter(p => {return p.complete})
          this.props.openProjects(open)
          this.props.closedProjects(closed)
        })
      })
  }else{
    fetch(`http://localhost:5000/properties/${this.props.property[0].id}`)
    .then(resp => resp.json())
    .then(data => {
      let open = data.projects.filter(p => {return !p.complete})
      let closed = data.projects.filter(p => {return p.complete})
      this.props.openProjects(open)
      this.props.closedProjects(closed)
    })
  }}

  componentDidMount() {

    this.updateGmails()
    this.updateOpenProjects()
    this.updateClosedProjects()

  }

  updateGmails = () => {
      console.log("gmail update clicked")
      this.props.clearGmails()
      this.getGmails()
  }

  updateOpenProjects = () => {
      console.log("open update")
      this.props.clearOpen()
      this.getProjects()
  }

  updateClosedProjects = () => {
      console.log("closed update")
      this.props.clearClosed()
      this.getProjects()
  }

  render(){
    return (
      <div >
        {this.props.property
          ?
          <div className='dashboard'>
            <h1 style={{color:'#2D5F5D', textAlign:'center', paddingTop: '10px', paddingBottom: '10px'}}>Your dashboard for {this.props.property[0].address}</h1>
            <GmailContainer updateGmails={this.updateGmails} history={this.props.history}/>
            <br />
            <br />
            <OpenProjectsContainer history={this.props.history} updateOpenProjects={this.updateOpenProjects} updateClosedProjects={this.updateClosedProjects}/>
            <br />
            <br />
            <ClosedProjectsContainer history={this.props.history}/>
          </div>
          :
          <h1>Loading...</h1>
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    property: state.property,
    labels: state.labels
  }
}

export default connect(mapStateToProps, { currentUser, currentProperty, openProjects, closedProjects, getLabels, getGmails, clearGmails, clearOpen, clearClosed })(Dashboard)