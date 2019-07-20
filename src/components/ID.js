import React, { Component } from 'react'
import passport from '../img/pass2.jpg'
import Spinner from 'react-spinner-material';
import firebase from '../firebase'

class ID extends Component {

    constructor (props) {
        super(props)
        this.state = { 
            pic: passport,
            file: false,
            stage: 'inputRequired',
            kycMessage: ''  
        }
        // this.onChangeCrmPersonId = this.onChangeCrmPersonId.bind(this)
    }

    pipedrivePersonKyc = event => {

        const phone = this.props.username
        console.log(phone)
        var kycStatusWanted = ''
        kycStatusWanted = event.target.value

        // call fb functions
        let crmPersonKyc = firebase.functions().httpsCallable('crmPersonKyc')
        crmPersonKyc({ personId : this.props.crmPersonId, kycStatusWanted })
        .then((result) => {
            // console.log('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
            alert('Kyc status changed for Person => name:' + phone + ' - Status: ' + kycStatusWanted)

            // Update App state with Kyc Status (var need to be a boolean)
            var kycStatusWantedBool = false
            if (kycStatusWanted.toLowerCase() === "true")  { kycStatusWantedBool=true }
            if (kycStatusWanted.toLowerCase() === "false") { kycStatusWantedBool=false }
            this.props.updateParentKyc(kycStatusWantedBool)

        }).catch(function(err) {
            console.log(err)
        });
    }

    pipedrivePersonAdd = () => {

        const phoneTest = this.props.username

        // We need the logged user phone number first
        firebase.auth().onAuthStateChanged( user => {
            if (!user) {
                return alert('No user is logged in!')
                // props.userLogged = false
            }
            console.log(user.phoneNumber + ' is logged in')
            const phone = user.phoneNumber
            
            // call fb function
            let crmPersonAdd = firebase.functions().httpsCallable('crmPersonAdd')

            crmPersonAdd({phone}).then((result) => {

                // Update App state with crmID (to display after in Navbar)
                this.props.updateParentId(result.data.id)               

                console.log('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
                alert('Person created in CRM => id:' + result.data.id + ', Name:' + result.data.name)
            
            }).catch(function(err) {
                console.log(err)
            })
        })
    };
    
    logout = () => {
        firebase.auth().signOut().then(() => {  
            console.log('User has logged out with success');
        })
        this.props.updateParentId(false)
        this.props.updateParentId(false)
    };

    idSelected = e => {
        if(e.target.files[0]){
            // Create temp pic url to display
            this.setState({pic: URL.createObjectURL(e.target.files[0])})
            // Add file in ID state
            this.setState({file: e.target.files[0]})
        }
    }

    sendId = () => {
        
        if (!this.state.file)  {
            return alert('You need to select an ID document first!')
        }
        // Display the waiting phase
        this.setState ({ stage: 'waitingVerification'})
        
        const image = this.state.file
        const uploadTask = firebase.storage().ref(`id-documents/${this.props.username}/${image.name}`).put(image)

        uploadTask.on('state_changed', 
        (snapshot)=> {
            // progress 
        },
        (error) => {
            // show error
            alert(error)
            console.log(error)
        },
        () => {
            // show complete
            console.log('Will load document to firebase...')
            firebase.storage().ref(`id-documents/${this.props.username}`).child(image.name).getDownloadURL().then(url => {
                console.log('Document has been uploaded to server at url: ' + url)
                console.log('ID verification is starting...')
                
                // call fb functions
                let idVerification = firebase.functions().httpsCallable('idVerification')
                idVerification({ phone: this.props.username, fileName : image.name })
                .then((result) => {
                    console.log(result)
                    // alert('Id verification status: ' + result.data.status + '\r\nMessage: ' + result.data.message)
                    this.setState ({ kycMessage: result.data.message })
                    if (result.data.status === 'success') {
                        this.setState ({ stage: 'resultSuccess'})
                    }
                    else {
                        this.setState ({ stage: 'resultFailure'})
                    }
                })
            
            })
        })
    }

    retry = () => {
        this.setState ({
            pic: passport,
            file: false,
            stage: 'inputRequired',
            kycMessage: ''
        })
        return true
    }

    render () {
        return (
            <div className="id">
                <div className="row center">
                    <h4>Step2: Validate your identity</h4>
                    <p>Please upload your passport to proove your identity.</p>
                    <img className="id-passport" src={this.state.pic} alt="passport_logo" id='id-passport'/>
                    <br></br>
                    { this.state.stage === 'inputRequired' &&
                        <div className="file-field input-field id-input">
                        <div className="btn teal lighten-2">
                            <span>Choose File</span>
                            <input type="file" onChange={this.idSelected} id='id-file'/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type = "text"
                                placeholder=".jpg .jpeg .png .pdf" />
                        </div>
                        <button className="btn orange darken-3 id-btn btn-large" onClick={this.sendId}><i className="material-icons left">cloud_upload</i>Get verified</button>
                    </div>
                    }
                    { this.state.stage === 'waitingVerification' &&
                        <div className="container">
                            <div className="container id-spinner">
                                <Spinner size={40} spinnerColor={"#fb8c00"} spinnerWidth={4} visible={true} />
                            </div>
                            <h5 className="orange-text darken-3"><i className="material-icons id-icon-clock">access_time</i> Please wait while we are verifying your identity document.</h5>
                        </div>   
                    }
                    { this.state.stage === 'resultSuccess' &&
                        <div className="container">
                            <h5 className="green-text darken-3"><i className="material-icons id-icon-clock">check_circle</i> ID has been verified with success!</h5>
                        </div>
                    }   
                    { this.state.stage === 'resultFailure' &&
                        <div className="container">
                            <h5 className="red-text darken-3"><i className="material-icons id-icon-clock">cancel</i> ID could not be verified: "{this.state.kycMessage}"</h5>
                            <button className="btn gray darken-3 id-btn btn-primary id-btn-retry" onClick={this.retry}><i className="material-icons left">loop</i>Retry</button>
                        </div>
                    }  
                </div>

                {/* // ADMIN SECTION */}
                <div className="row id-admin center">
                    <div className="col s12 center-align">
                        {/* <div className="card blue-grey darken-1"> */}
                        <button className="btn orange darken-3 btn-small" onClick={this.pipedrivePersonAdd}>1. Create person in CRM </button>   
                        <button className="btn green darken-3 btn-small" onClick={this.pipedrivePersonKyc} value={true}>2.KYC verified=True</button>
                        <button className="btn red darken-3 btn-small" onClick={this.pipedrivePersonKyc} value={false}>2.KYC verified=False</button>   
                        <button className="btn orange darken-3 btn-small" onClick={this.logout}>4.Logout</button>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ID;