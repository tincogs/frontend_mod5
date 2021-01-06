import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Checkbox } from 'semantic-ui-react'
import DataTable, { createTheme } from 'react-data-table-component';
import { newGmailProj, newProject } from '../actions/data';

let columns

createTheme('solarized', {
    text: {
      primary: '#022140',
      secondary: '#265077',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#f3f9ff',
    },
    striped: {
      default: '#e0effe',
      text: '#022140',
    },
    context: {
      background: '#2d5f5d',
      text: '#FFFFFF',
    },
    divider: {
      default: '#265077',
    },
    action: {
      button: '#FFFFFF',
      hover: '#265077',
      disabled: 'rgba(0,0,0,.12)',
    },
    button: {
      default: 'rgba(0,0,0,.54)',
      focus: 'rgba(0,0,0,.12)',
      hover: '#2d5f5d',
      disabled: 'rgba(0, 0, 0, .18)',
    },
    sortFocus: {
      default: 'rgba(0, 0, 0, .54)',
    },
    selected: {
      default: '#e3f2fd',
      text: 'rgba(0, 0, 0, 0.87)',
    },
    highlightOnHover: {
      default: '#265077',
      text: '#ffffff',
    }
  });

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

let quickProjects;

class Gmails extends React.Component {

    state = { toggledClearRows: false }

    handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        quickProjects = state.selectedRows
        console.log('Quick Projs: ', quickProjects);
    };

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows})
    }

    handleClick = (e) => {
      const gmailProj = {
        description: e.target.parentNode.previousSibling.innerText,
        subcategory: e.target.parentNode.previousSibling.previousSibling.previousSibling.innerText,
        category: e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText,
        name: e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerText,
      }
      console.log(gmailProj)
      this.props.newGmailProj(gmailProj)
      this.props.history.push(`/projects/new`)
    }

    quickClick = () => {
      quickProjects.forEach(p => {
        let subcat;
        subcat = p.subCategory ? p.subCategory[0] : null
        let cat;
        cat = p.category ? p.category[0] : null
        const qp = {
        property_id: this.props.property[0].id,
        description: p.body,
        subcategory: subcat,
        category: cat,
        name: p.subject
        }
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(qp)
        }
        console.log(reqObj)
        fetch(`http://localhost:5000/quick_project`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
          if (data.error) {
            alert(data.error)
            // this.setState({
            //   error: data.error
            // })
          } else {
            console.log(data)
            this.props.newProject(data)
            this.handleClearRows()
            // this.props.newProject(data)
            // this.props.history.push('/dashboard')
          }
        })

      })
    }

    newProjButton = () => (<Button class="ui compact button" color='teal' onClick={(e)=> this.handleClick(e)}>Create Project</Button>)

    componentDidMount(){

        columns = [
            {
                name: 'Date',
                selector: 'date',
                cell: row => <div style={{ fontWeight: 400 }}>{row.date}</div>,
                wrap:true,
                sortable: true
            },
            {
                name: 'Subject',
                cell: row => <div style={{ fontWeight: 400 }}>{row.subject}</div>,
                sortable: false
            },
            {
                name: 'Category',
                selector: 'category',
                sortable: true
            },
            {
                name: 'SubCategory',
                selector: 'subCategory',
                sortable: true
            },
            {
              name: 'Sender',
              selector: 'sender',
              cell: row => (
                  <div>
                    {
                    row.sender.split('<')[0]
                    }
                  </div>
                ),
              grow: 1.5,
              sortable: true
            },
            {
              name: 'Body',
              cell: row => <div data-tag="allowRowEvents"><div style={{ fontWeight: 400 }}>{row.body}</div></div>,
              sortable: false,
              wrap: true,
              left: true
            },
            {
                name: '',
                // button: true,
                // ignoreRowClick: true,
                cell: () => <this.newProjButton class="ui compact button">Create Project</this.newProjButton>
            }
        ]

    }


    render() {
        return (
            <div>
              {this.props.gmails
                ?
               <div>
               <DataTable
                title="Gmail Inbox"
                columns={columns}
                data={this.props.gmails}
                noDataComponent='Loading...'
                defaultSortField='date'
                defaultSortAsc={false}
                theme='solarized'
                customStyles={customStyles}
                striped={true}
                pagination
                paginationPerPage= {5}
                paginationRowsPerPageOptions={[5,10,15,20]}
                selectableRows
                selectableRowsComponent={Checkbox}
                onSelectedRowsChange={this.handleChange}
                clearSelectedRows={this.state.toggledClearRows}
                />
               <div>
                <Button.Group attached='bottom' fluid>
                  <Button color='pink' onClick={this.quickClick}>Quick Create Projects for Selected</Button>
                  <Button.Or className='gmailOr' />
                  <Button color='pink' style={{width:'261px'}}content='Load Gmails' icon={{name:'google', color:'white'}} onClick={this.props.updateGmails}/>
                </Button.Group>
               </div>
               </div>
                :
               <h5>Messages Loading...</h5>
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

  const mapDispatchToProps = {
    newGmailProj,
    newProject
  }

export default connect(mapStateToProps, mapDispatchToProps)(Gmails)