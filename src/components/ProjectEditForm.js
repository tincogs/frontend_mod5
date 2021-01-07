import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProject, clearEdit, updateProject, deleteProject } from '../actions/data.js'
import { Button, Form, Checkbox } from 'semantic-ui-react'

class ProjectEditForm extends Component {

    state = {
        id: this.props.edit.id,
        name: this.props.edit.name,
        description: this.props.edit.description,
        category: this.props.edit.category,
        subcategory: this.props.edit.subcategory,
        action_item: this.props.edit.action_item,
        complete: this.props.edit.complete
    }



    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...this.state})
        }

        fetch(`http://localhost:5000/projects/${this.props.edit.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
          if (data.error) {
            this.setState({
              error: data.error
            })
          } else {
            this.props.history.push('/dashboard')
            this.props.updateProject(data)
            this.props.clearEdit()
          }
        })
    }

    handleDelete = () => {
      if(window.confirm("Are you sure you would like to delete this project?"))
      {
        fetch(`http://localhost:5000/projects/${this.props.edit.id}`, {method: 'DELETE'})
          .then(resp => resp.json())
          .then(data => {
            data.errors
            ?
            alert(data.errors)
            :
            this.props.deleteProject(this.props.edit.id)
            this.props.history.push('/dashboard')
            this.props.clearEdit()
          })
      }
    }

    render() {
        return (
            <div className='Form' >
              <Form onSubmit={this.handleSubmit}>
              <h1>Update Project</h1>
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
               <h5>Incomplete   <Checkbox toggle color='black' onClick={() => this.setState({complete: !this.state.complete})}/>   Complete</h5>
              <br />
              <Button.Group size='large'>
                  <Button color='pink' onClick={this.handleDelete}>Delete</Button>
                  <Button.Or />
                  <Button color='pink' type='submit'>Save</Button>
              </Button.Group>
              </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    editProject,
    clearEdit,
    updateProject,
    deleteProject
}

const mapStateToProps = (state) => {
  return {
    edit: state.editProject
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm)