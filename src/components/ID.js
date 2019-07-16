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

    const pipedrivePersonKyc = event => {

        const phone = props.username
        const kycStatusWanted = event.target.value

        console.log (props)

        // call fb functions
        let crmPersonKyc = firebase.functions().httpsCallable('crmPersonKyc')
        crmPersonKyc({ personId : props.crmPersonId, kycStatusWanted })
        .then((result) => {
            // console.log('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
            alert('Kyc status changed for Person => name:' + phone + ' - Status: ' + kycStatusWanted)
            
            // Update App state with Kyc Status
            props.updateParentKyc(kycStatusWanted)

        }).catch(function(err) {
            console.log(err)
        });
    }

    const pipedrivePersonAdd = () => {
        // We need the logged user phone number first
        firebase.auth().onAuthStateChanged(function(user){
            if (!user) {
                return alert('No user is logged in!')
                // props.userLogged = false
            }
            console.log(user.phoneNumber + ' is logged in')
            const phone = user.phoneNumber
            
            // call fb function
            let crmPersonAdd = firebase.functions().httpsCallable('crmPersonAdd')
            crmPersonAdd({phone}).then((result) => {
                
                // Update App state with crmID
                props.updateParentId(result.data.id)
                
                console.log('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
                alert('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
            
            }).catch(function(err) {
                console.log(err)
            })
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
            <div className='row'>
                <button className="btn orange darken-3 btn-index" onClick={pipedrivePersonAdd}>Create person in CRM </button>   
            </div>
            <div className='row'>
                <button className="btn green darken-3 btn-index" onClick={pipedrivePersonKyc} value={'True'}>KYC verified=True</button>   
                <button className="btn red darken-3 btn-index" onClick={pipedrivePersonKyc} value={'False'}>KYC verified=False</button>   
            </div>
            <div className='row'>
                <button className="btn black darken-3 btn-index" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default ID;