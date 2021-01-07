import React from 'react';
import { connect } from 'react-redux'
import { PDFDownloadLink, Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { Button } from 'semantic-ui-react';
import ReportTableContainer from './ReportTableContainer';



const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-evenly',
    alignItems: 'flex-start'
  },
  section: {
    marginTop:'7%',
    marginRight:'3%',
    marginLeft:'3%',
    display: 'flex',
    border:1,
    order: 3,
    maxHeight: '40%',
    maxWidth: '45%',
    flexGrow: 1,
    flexBasis: 'auto'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 20,
    justifyContent:'space-around',
    width:'100%',
    color:'#022140',
    textDecoration: 'underline'
  },
  cell: {
      fontSize: 11,
      backgroundColor:'#e0effe',
      paddingTop:3,
      paddingBottom:3
  },
  header: {
      fontSize: 12,
      fontWeight: 'bolder',
      backgroundColor:'#265077',
      color:'#ffffff',
      paddingTop:2,
      paddingBottom:2
  }
});

class ReportPDF extends React.Component {

  componentDidMount() {

  }

    handleClick = (e) => {
      window.open('https://mail.google.com/mail/u/0/#compose')
      this.props.history.push('/dashboard')
    }

    reportDate = () => {
      let dt = new Date()
      let output = this.monthName(dt) + ' ' + dt.getDate( ) + ', ' + dt.getFullYear( )
      return output
    }

    monthName = (date) => {
      const dateNmbr = new Date(Date.parse(date))
      const month = dateNmbr.toLocaleString('default', { month: 'long' })
      return month
    }

    MyDoc = (props) => (
        <Document>
          <Page size='letter' style={styles.page} orientation='landscape' wrap>
            <View>
            <Text style={styles.title} debug>{`${this.reportDate()} Project Report for ${this.props.property[0].address}`}</Text>
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
                                <Text style={styles.cell} wrap>{p.description}</Text>
                                <Text style={styles.header}>Date Opened:</Text>
                                <Text style={styles.cell}>{new Date(Date.parse(p.created_at)).getMonth() + 1 + '/' + new Date(Date.parse(p.created_at)).getDate() + '/' + new Date(Date.parse(p.created_at)).getFullYear()}</Text>
                                <Text style={styles.header}>Date Closed:</Text>
                                <Text style={styles.cell}>{new Date(Date.parse(p.updated_at)).getMonth() + 1 + '/' + new Date(Date.parse(p.updated_at)).getDate() + '/' + new Date(Date.parse(p.updated_at)).getFullYear()}</Text>
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
          <PDFDownloadLink document={<this.MyDoc data={this.props.reportProjects}/>} fileName={`${this.reportDate()} Report.pdf`}>
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Report')}
          </PDFDownloadLink>
        </Button>
      )

    render() {
        return (
            <div style={{textAlign: 'center', paddingTop: '5px'}}>
                {this.props.reportProjects
                ?
                <div className='pdf container'>
                <ReportTableContainer />
                <br/>
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