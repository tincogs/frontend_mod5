import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import DataTable from 'react-data-table-component';
import { addToReport } from '../actions/data';


let columns;
let reportProjects;

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

class ClosedProjects extends React.Component {

    state = { toggledClearRows: false }

    handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        reportProjects = state.selectedRows
        // console.log('Selected Rows: ', reportProjects);
    };

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows})
    }

    handleClick = () => {
        reportProjects.forEach(p => p.add_to_report = true)
        this.props.addToReport(reportProjects)
        this.props.history.push('/reports/new')
    }

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
                sortable: true
            },
            {
                name: 'Subcategory',
                selector: 'subcategory',
                sortable: true
            },
            {
                name: 'Description',
                cell: row => <div style={{ fontWeight: 400 }}>{row.description}</div>,
                sortable: false
            },
            {
                name: 'Date Closed',
                selector: 'updated_at',
                format: row => <div style={{ fontWeight: 400 }}>{new Date(Date.parse(row.updated_at)).getMonth() + 1 + '/' + new Date(Date.parse(row.updated_at)).getDate() + '/' + new Date(Date.parse(row.updated_at)).getFullYear()}</div>,
                sortable: true
            },
        ]

    }


    render() {
        return (
            <div>
              {this.props.closedProjects
                ?
               <div>
               <DataTable
                title="Closed Projects"
                columns={columns}
                data={this.props.closedProjects}
                theme='solarized'
                striped
                customStyles={customStyles}
                defaultSortField='created_at'
                pagination
                paginationPerPage= {5}
                paginationRowsPerPageOptions={[5,10,15,20]}
                selectableRows
                selectableRowsComponent={Checkbox}
                onSelectedRowsChange={this.handleChange}
                clearSelectedRows={this.state.toggledClearRows}
                />
                <div>
                <Button fluid='true' color='blue' attached='bottom' onClick={this.handleClick}>Create New Report w/ Selected Projects</Button>
                </div>
                </div>
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
      closedProjects: state.closedProjects
    }
  }

  const mapDispatchToProps = {
    addToReport
  }

export default connect(mapStateToProps, mapDispatchToProps)(ClosedProjects)