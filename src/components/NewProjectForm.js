import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newProject } from '../actions/data.js'
import { Button, Form, Checkbox } from 'semantic-ui-react'

class NewProjectForm extends Component {
        state = {
            name: "",
            description: "",
            category: "",
            subcategory: null,
            complete: false,
            add_to_report: false,
            action_item: ""
        }

    componentDidMount(){
        if(this.props.new){
            this.setState({
                name: this.props.new.name,
                description: this.props.new.description,
                category: this.props.new.category,
                subcategory: this.props.new.subcategory,
                property_id: this.props.property[0].id,
                complete: false,
                add_to_report: false,
                action_item: ""
            })
        } else {
            this.setState({
                ...this.state,
                property_id: this.props.property[0].id
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleBack = () => {this.props.history.push('/dashboard')}

      handleSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...this.state})
        }
        console.log(reqObj)
        fetch(`http://localhost:5000/projects/`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
          if (data.error) {
            this.setState({
              error: data.error
            })
          } else {
            this.props.newProject(data)
            this.props.history.push('/dashboard')
          }
        })
    }

    render() {
        return (
            <div className='Form'>
              <Form onSubmit={this.handleSubmit} >
              <h1>Create New Project</h1>
              <Form.Field>
              <input style={{width:'200px'}} name={'name'} placeholder='Project' onChange={this.handleInputChange} value={this.state.name} /><br />
              </Form.Field>
              <Form.Field>
              <input style={{width:'200px'}} name={'category'} placeholder='Category' onChange={this.handleInputChange} value={this.state.category} /><br />
              </Form.Field>
              <Form.Field>
              <input style={{width:'200px'}} name={'subcategory'} placeholder='Subcategory' onChange={this.handleInputChange} value={this.state.subcategory} /><br />
              </Form.Field>
              <Form.Field>
              <textarea style={{width:'300px'}} name={'description'} placeholder='Description' onChange={this.handleInputChange} value={this.state.description} /><br />
              </Form.Field>
              <Form.Field>
              <input style={{width:'200px'}} name={'action_item'} placeholder='Action Item' onChange={this.handleInputChange} value={this.state.action_item} /><br />
              </Form.Field>
              <h3>Project Status</h3>
               <h5>Incomplete   <Checkbox toggle style={{color: 'green'}}onClick={() => this.setState({complete: !this.state.complete})}/>   Complete</h5>
              <br />
              <Button.Group size='large'>
                  <Button color='pink' onClick={this.handleBack}>Back</Button>
                  <Button.Or />
                  <Button color='pink' type='submit'>Submit</Button>
              </Button.Group>
              </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    newProject
}

const mapStateToProps = (state) => {
  return {
    new: state.newProject,
    property: state.property
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(NewProjectForm)