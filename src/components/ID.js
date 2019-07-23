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
            kycVerified: '',
            kycMessage: ''
        }
        this.pipedrivePersonAdd = this.pipedrivePersonAdd.bind(this);
        // this.pipedrivePersonKyc = this.pipedrivePersonKyc.bind(this);
        // this.onChangeCrmPersonId = this.onChangeCrmPersonId.bind(this)
    }

    // Load pic in ID state
    idSelected = e => {
        if(e.target.files[0]){
            // Create temp pic url to display
            this.setState({pic: URL.createObjectURL(e.target.files[0])})
            // Add file in ID state
            this.setState({file: e.target.files[0]})
        }
    }
    
    // Add a new CRM person (using phone as the name / phone ). Return CRM personID (username) to app state
    pipedrivePersonAdd = props => {
   
        // We need the logged user phone number first
        firebase.auth().onAuthStateChanged( user => {
            if (!user) {
                return alert('No user is logged in, please restart the workflow!')
            }
            const phone = user.phoneNumber
            console.log(phone + ' is logged in')

            // call fb function to CREATE PERSON (will return personID)
            let crmPersonAdd = firebase.functions().httpsCallable('crmPersonAdd')

            crmPersonAdd({phone}).then((result) => {
                var personID = result.data.id
                // Update App state with crmID (to display after in Navbar)
                this.props.updateParentId(personID)

                // alert('Person created in CRM => id:' + personID + ', Name:' + result.data.name)
                console.log('Person created in CRM => CrmID: ' + personID + '| kycVerified: ' + this.state.kycVerified + '| kycMessage: ' + this.state.kycMessage)

                // call fb function to change the 2 KYC fields
                let crmPersonKyc = firebase.functions().httpsCallable('crmPersonKyc')
                crmPersonKyc({ 
                    personId : personID,
                    kycStatusWanted: this.state.kycVerified.toString(),
                    kycMessage: this.state.kycMessage 
                })
                .then((result) => {
                    console.log('Updated Kyc fields in CRM for person => name: ' + phone + ' | personID: ' + personID + ' | kycVerified: ' + this.state.kycVerified + ' | kycMessage: ' + this.state.kycMessage)
                    // alert('Kyc status changed for Person => name:' + phone + 'personID' + personID + ' - kycVerified: ' + kycVerified)
                    this.props.updateParentKyc(this.state.kycVerified)

                    // Display the result to user
                    if (this.state.kycVerified) {
                        this.setState ({ 
                            stage: 'resultSuccess',
                        })
                    }
                    else {
                        this.setState ({ 
                            stage: 'resultFailure',
                        })
                    }

                }).catch(function(err) {
                    console.log(err)
                })

            }).catch(function(err) {
                console.log(err)
            })
        })
    };

    // Send pic to fb function for validation. Then create CRM person and update KYC status in CRM
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
            firebase.storage().ref(`id-documents/${this.props.username}`).child(image.name).getDownloadURL().then(url => {
                console.log('Document has been uploaded to server at url: ' + url)
                
                // call fb functions TO CHECK ID (fake services)
                console.log('ID verification is starting...')
                let idVerification = firebase.functions().httpsCallable('idVerification')
                
                idVerification({ phone: this.props.username, fileName : image.name })
                .then((result) => {
                    console.log(result)
                    console.log('Id verification response => verified? ' + result.data.status + '\r\nMessage: ' + result.data.message)
                    // alert('Id verification status: ' + result.data.status + '\r\nMessage: ' + result.data.message)
                    this.setState ({ kycMessage: result.data.message })
                    if (result.data.status) {
                        this.setState ({ kycVerified: true })
                    }
                    else {
                        this.setState ({ kycVerified: false })
                    }
                })
                .then( () => {
                    console.log(this.state)

                    // Now create a new CRM person
                    this.pipedrivePersonAdd()
                    
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
                    <p>Please upload your passport to prove your identity.</p>
                    <img className="id-passport" src={this.state.pic} alt="passport_logo"/>
                    <br></br>
                    { this.state.stage === 'inputRequired' &&
                        <div className="file-field input-field id-input">
                        <div className="btn grey darken-3">
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
                                <Spinner size={40} spinnerColor={"#424242"} spinnerWidth={4} visible={true} />
                            </div>
                            <h5><i className="material-icons id-icon-clock">access_time</i> Please wait while we are verifying your identity document...</h5>
                        </div>   
                    }
                    { this.state.stage === 'resultSuccess' &&
                        <div className="container">
                            <h5 className="green-text darken-4"><i className="material-icons id-icon-clock">check_circle</i> ID document has been verified with success!</h5>
                        </div>
                    }   
                    { this.state.stage === 'resultFailure' &&
                        <div className="container">
                            <h5 className="orange-text darken-4"><i className="material-icons id-icon-clock">cancel</i> ID document could not be verified: "{this.state.kycMessage}"</h5>
                            <button className="btn id-btn id-btn-retry orange darken-3" onClick={this.retry}><i className="material-icons left">loop</i>Retry</button>
                        </div>
                    }  
                </div>
            </div>
        )
    }
}

export default ID;