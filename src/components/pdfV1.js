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



