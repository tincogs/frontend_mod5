import React from 'react';
import { connect } from 'react-redux'
import { PDFDownloadLink, Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { Button } from 'semantic-ui-react';
import ReportTableContainer from './ReportTableContainer';



const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'flex-start'
  },
  section: {
    margin: 4,
    paddingTop:10,
    marginTop:'6%',
    display: 'flex',
    border:1,
    order: 3,
    maxHeight:'40%'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 10,
    justifyContent:'space-around',
    width:'100%'
  },
  cell: {
      fontSize: 10,
      backgroundColor:'#e0effe'
  },
  header: {
      fontSize: 16,
      fontWeight: 'bold'
  }
});

const reportDate = () => {
    let dt = new Date()
    let output = dt.getMonth( ) + 1 + '-' + dt.getDate( ) + '-' + dt.getFullYear( )
    return output
}

let columns;
let data;

class ReportPDF extends React.Component {

  componentDidMount() {
    data = this.props.reportProjects
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

    handleClick = (e) => {
        console.log(e, 'Button click')
    }

    openDate = (index) => {
        let odt = new Date(Date.parse(this.props.reportProjects.find(x => x.id === index).created_at)).getMonth() + 1 + '/' + new Date(Date.parse(this.props.reportProjects[index].created_at)).getDate() + '/' + new Date(Date.parse(this.props.reportProjects[index].created_at)).getFullYear()
        return odt
    }

    closeDate = (index) => {
        let cdt = new Date(Date.parse(this.props.reportProjects.find(x => x.id === index).updated_at)).getMonth() + 1 + '/' + new Date(Date.parse(this.props.reportProjects[index].updated_at)).getDate() + '/' + new Date(Date.parse(this.props.reportProjects[index].updated_at)).getFullYear()
        return cdt
    }

    projectName = () => {
        let projNames = this.props.reportProjects.map(p => <Text style={{borderTop:2}}>{p.name}</Text>);
        console.log(projNames)
    }

    MyDoc = (props) => (
        <Document>
          <Page size='letter' style={styles.page} orientation='landscape' wrap>
            <View>
            <Text style={styles.title} debug='true'>{`Project Report for ${reportDate()}`}</Text>
            </View>
            {
                props.data
                ?
                props.data.map((p, index) => {
                    return (
                            <View key={index} style={styles.section} wrap={false} >
                                <Text style={styles.header}>Project:</Text>
                                <Text style={styles.cell}>{p.name}</Text>
                                <Text style={styles.header}>Category:</Text>
                                <Text style={styles.cell}>{p.category ? p.category : "N/A"}</Text>
                                <Text style={styles.header}>SubCategory:</Text>
                                <Text style={styles.cell}>{p.subcategory ? p.subcategory : "N/A"}</Text>
                                <Text style={styles.header}>Description:</Text>
                                <Text style={styles.cell}>{p.description}</Text>
                                <Text style={styles.header}>Date Opened:</Text>
                                <Text style={styles.cell}>{p.created_at}</Text>
                                <Text style={styles.header}>Date Closed:</Text>
                                <Text style={styles.cell}>{p.updated_at}</Text>
                            </View>
                    );
                  })
                :
                ""
            }
          </Page>
        </Document>
      )

    DownloadBtn = () => (
        <Button onClick={(e) => this.handleClick(e)} >
          <PDFDownloadLink document={<this.MyDoc data={this.props.reportProjects}/>} fileName={`${reportDate()} Report.pdf`}>
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Report')}
          </PDFDownloadLink>
        </Button>
      )

    render() {
        return (
            <div style={{textAlign: 'center', paddingTop: '5px'}}>
                {this.props.reportProjects
                ?
                <div>
                <ReportTableContainer />
                <this.DownloadBtn>Download Report PDF</this.DownloadBtn>
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

  const mapDispatchToProps = {

  }

export default connect(mapStateToProps, mapDispatchToProps)(ReportPDF)