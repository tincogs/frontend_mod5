import React from 'react'
import { connect } from 'react-redux'
import DataTable from 'react-data-table-component';

let columns;

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

class ReportTable extends React.Component {

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
                sortable: false,
                left: true
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
              {this.props.reportProjects
                ?
               <div>
                <DataTable
                title="New Report"
                columns={columns}
                data={this.props.reportProjects}
                theme='solarized'
                customStyles={customStyles}
                />
                </div>
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
      reportProjects: state.reportProjects
    }
  }


export default connect(mapStateToProps, null)(ReportTable)