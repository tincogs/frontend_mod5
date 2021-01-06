// // import React, { Component } from 'react'

// // const CLIENT_ID = "16925787258-d33qvibcs55vegmaumeli330mju7403o.apps.googleusercontent.com"
// // const API_KEY = "AIzaSyDRw9WrFW1cMIfGa6ENr6DiLECOEJUlVqk"
// // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
// // const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'

// // const handleClientLoad = () => {
// //     window.gapi.load('client:auth2', initClient);
// // }

// // const initClient = () => {
// //     window.gapi.client.init({
// //         apiKey: API_KEY,
// //         clientId: CLIENT_ID,
// //         discoveryDocs: DISCOVERY_DOCS,
// //         scope: SCOPES
// //     })
// //     .then(() => {
// //            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
// //             updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
// //             authorizeButton.onclick = handleAuthClick;
// //             signoutButton.onclick = handleSignoutClick;
// //         }, (error) => {
// //             appendPre(JSON.stringify(error, null, 2));
// //             }
// //     )
// // }

// // const updateSigninStatus = (isSignedIn) => {
// //     if (isSignedIn) {
// //         authorizeButton.style.display = 'none';
// //         signoutButton.style.display = 'block';
// //         listLabels();
// //     } else {
// //         authorizeButton.style.display = 'block';
// //         signoutButton.style.display = 'none';
// //     }
// // }

// // const handleAuthClick = (event) => {
// //     window.gapi.auth2.getAuthInstance().signIn();
// //   }

// // export default class Login extends Component {

// //     componentDidMount() {}


// //     render() {
// //         return (
// //             <div>

// //             </div>
// //         )
// //     }
// // }



// <View style={[styles.section, {width: '10%'}, {position: 'absolute'}, {marginLeft:'2%'}]}>
// <Text style={styles.header}>Project</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.props.reportProjects[0].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.props.reportProjects[1].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.props.reportProjects[2].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.props.reportProjects[3].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.props.reportProjects[4].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.props.reportProjects[5].name : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.props.reportProjects[6].name : null}
// </Text>
// </View>
// <View style={[styles.section, {width: '15%'}, {position: 'absolute'}, {marginLeft:'14%'}]}>
// <Text style={styles.header}>Category</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.props.reportProjects[0].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.props.reportProjects[1].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.props.reportProjects[2].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.props.reportProjects[3].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.props.reportProjects[4].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.props.reportProjects[5].category : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.props.reportProjects[6].category : null}
// </Text>
// </View>
// <View style={[styles.section, {width: '15%'}, {position: 'absolute'}, {marginLeft:'31%'}]}>
// <Text style={styles.header}>SubCategory</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.props.reportProjects[0].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.props.reportProjects[1].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.props.reportProjects[2].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.props.reportProjects[3].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.props.reportProjects[4].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.props.reportProjects[5].subcategory : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.props.reportProjects[6].subcategory : null}
// </Text>
// </View>
// <View style={[styles.section, {width: '20%'}, {position: 'absolute'}, {marginLeft:'48%'}]}>
// <Text style={styles.header}>Description</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.props.reportProjects[0].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.props.reportProjects[1].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.props.reportProjects[2].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.props.reportProjects[3].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.props.reportProjects[4].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.props.reportProjects[5].description : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.props.reportProjects[6].description : null}
// </Text>
// </View>
// <View style={[styles.section, {width: '8%'}, {position: 'absolute'}, {marginLeft:'68%'}]}>
// <Text style={styles.header}>Date Opened</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.openDate(0) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.openDate(1) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.openDate(2) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.openDate(3) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.openDate(4) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.openDate(5) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.openDate(6) : null}
// </Text>
// </View>
// <View style={[styles.section, {width: '10%'}, {position: 'absolute'}, {marginLeft:'84%'}]}>
// <Text style={styles.header}>Date Closed</Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[0] ? this.closeDate(0) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[1] ? this.closeDate(1) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[2] ? this.closeDate(2) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[3] ? this.closeDate(3) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[4] ? this.closeDate(4) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[5] ? this.closeDate(5) : null}
// </Text>
// <Text style={styles.cell}>
//     {this.props.reportProjects[6] ? this.closeDate(6) : null}
// </Text>
// </View>