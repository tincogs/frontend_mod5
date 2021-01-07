import React from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox } from 'semantic-ui-react'
import DataTable from 'react-data-table-component';
import { editProject, quickCloseAction } from '../actions/data';

let columns;
let quickClose;

const customStyles = {
    header: {
      style: {
        fontSize: '36px',
        fontWeight: 900,
        color: '#FFFFFF',
        backgroundColor: '#022140',
        minHeight: '56px',
        paddingLeft: '10%',
        paddingRight: '90%',
        paddingTop: '10px',
        borderTopLeftRadius: '9px',
        borderTopRightRadius: '9px',
      },
    },
    subHeader: {
      style: {
        backgroundColor: '#2D5F5D',
        minHeight: '52px',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#e0effe',
      }
    },
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 500,
      }
    },
    pagination: {
      style: {
        color: '#ffffff',
        fontSize: '13px',
        minHeight: '40px',
        backgroundColor: '#022140',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#2d5f5d',
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        margin: 'px',
        cursor: 'pointer',
        transition: '0.4s',
        color: '#2d5f5d',
        fill: '#2d5f5d',
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'not-allowed',
          color: '#265077',
          fill: '#265077',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: '#1e4258',
          fill: '#ffffff'
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: '#1e4258',
          fill: '#ffffff'
        },
      },
    },
  }

class OpenProjects extends React.Component {

    state = { toggledClearRows: false }

    handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        quickClose = state.selectedRows
        console.log('Quick Close: ', quickClose);
    };

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows})
    }

    handleClick = (e) => {
        const projectId = parseInt(e.target.parentElement.previousElementSibling.innerText)
        const projectToEdit = this.props.openProjects.find(p => p.id === projectId)
        this.props.editProject(projectToEdit)
        this.props.history.push(`/projects/edit/${projectToEdit.id}`)
    }

    quickClick = () => {
        quickClose.forEach(p => {
            p.complete = true
            const reqObj = {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
              }

              fetch(`http://localhost:5000/quick_close`, reqObj)
              .then(resp => resp.json())
              .then(data => {
                  console.log(data)
                  console.log(this.props.openProjects)
                if (data.error) {
                    alert(data.error)
                } else {
                    // this.props.updateOpenProjects()
                    // this.props.updateClosedProjects()
                    this.props.quickCloseAction(data)
                }
              })
        })
        this.handleClearRows()
      }

    updateButton = () => (<Button class="ui compact button" color='teal' onClick={(e)=> this.handleClick(e)}>Update</Button>)

    componentDidMount(){

        columns = [
            {
                name: 'Date Opened',
                selector: 'created_at',
                format: row => <div><div style={{ fontWeight: 400 }}>{new Date(Date.parse(row.created_at)).getMonth() + 1 + '/' + new Date(Date.parse(row.created_at)).getDate() + '/' + new Date(Date.parse(row.created_at)).getFullYear()}</div></div>,
                sortable: true
            },
            {
                name: 'Project',
                selector: 'name',
                cell: row => <div style={{ fontWeight: 400 }}>{row.name}</div>,
                sortable: true
            },
            {
                name: 'Category',
                selector: 'category',
                format: row => <div style={{ fontWeight: 400 }}>{row.category}</div>,
                sortable: true
            },
            {
                name: 'Subcategory',
                selector: 'subcategory',
                sortable: true
            },
            {
                name: 'Details',
                cell: row => <div data-tag="allowRowEvents"><div style={{ fontWeight: 400 }}>{row.description}</div></div>,
                sortable: false,
                grow: 2
            },
            {
                name: 'Action Item',
                selector: 'action_item',
                sortable: true
            },
            {
                name: 'Last Updated',
                selector: 'updated_at',
                format: row => <div><div style={{ fontWeight: 400 }}>{new Date(Date.parse(row.updated_at)).getMonth() + 1 + '/' + new Date(Date.parse(row.updated_at)).getDate() + '/' + new Date(Date.parse(row.updated_at)).getFullYear()}</div></div>,
                sortable: true
            },
            {
                name: '',
                selector: 'id',
                hide: 6000
            },
            {
                name: '',
                // button: true,
                // ignoreRowClick: true,
                cell: () => <this.updateButton className="ui compact button">Update Project</this.updateButton>
            }
        ]

    }

    render() {
        return (
            <div>
              {this.props.openProjects
                ?
               <div>
               <DataTable
                title="Open Projects"
                columns={columns}
                data={this.props.openProjects}
                noDataComponent='Loading...'
                defaultSortField='created_at'
                defaultSortAsc='false'
                theme='solarized'
                customStyles={customStyles}
                striped
                pagination
                paginationPerPage= {5}
                paginationRowsPerPageOptions={[5,10,15,20]}
                selectableRows
                selectableRowsComponent={Checkbox}
                onSelectedRowsChange={this.handleChange}
                clearSelectedRows={this.state.toggledClearRows}
                />
                <div>
                <Button fluid='true' color='blue' attached='bottom' onClick={this.quickClick}>Close Out Selected Projects</Button>
                </div>
                </div>
                :
               <h5>Open Projects Loading...</h5>
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
      openProjects: state.openProjects
    }
  }

  const mapDispatchToProps = {
    editProject,
    quickCloseAction
  }

export default connect(mapStateToProps, mapDispatchToProps)(OpenProjects)