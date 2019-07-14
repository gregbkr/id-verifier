import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

var firebaseConfig = {
    apiKey: "AIzaSyAn7Mc7eBmZClRDW-VDQEphzWKMvMsmmrM",
    authDomain: "id-prod.firebaseapp.com",
    databaseURL: "https://id-prod.firebaseio.com",
    projectId: "id-prod",
    storageBucket: "",
    messagingSenderId: "140663729281",
    appId: "1:140663729281:web:9483014c422cdafb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ID = props => {
    console.log ('3 ----------')
    console.log (props.userLogged)
    console.log (props.user)
    console.log ('4 ----------')

    const pipedrivePersonAdd = () => {
        // We need the logged user phone number first
        firebase.auth().onAuthStateChanged(function(user){
            if (!user) {
                return alert('No user is logged in!')
                // props.userLogged = false
            }
            console.log(user.phoneNumber + ' is logged in')
            const phone = user.phoneNumber
            
            // call fb functions
            let crmPersonAdd = firebase.functions().httpsCallable('crmPersonAdd')
            crmPersonAdd({phone}).then((result) => {
                console.log('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
                alert('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
            }).catch(function(err) {
                console.log(err)
            });
      })
    };
    const logout = () => {
        firebase.auth().signOut().then(() => {  
            console.log('User has logged out with success');
        })
    };
    
    return (
        <div className="id center-align">
            <h4>Step2: Validate your identity</h4>
            <p>Please upload your passport to proove your identity.</p>
            <button className="btn  orange darken-3 btn-index" onClick={pipedrivePersonAdd}>Create CRM person</button>   
            <button className="btn  orange darken-3 btn-index" onClick={logout}>Logout</button>
        </div>
    )
}

export default ID;