import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Phone from './components/Phone'
import ID from './components/ID'
import firebase from './firebase'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      username: false,
      crmPersonId: false,
      kycVerified: false
    }
    this.onChangeCrmPersonId = this.onChangeCrmPersonId.bind(this)
  }

  // Get crmId from ID component, and display in navbar
  onChangeCrmPersonId = id => {
    this.setState({crmPersonId: id})
    console.log('Updated App state with crmID = ' + this.state.crmPersonId)
  }

  // Get Kyc status from ID component, and display in navbar
  onChangeKycStatus = status => {
    this.setState({kycVerified: status})
    console.log('Updated App state with kycVerified = ' + this.state.kycVerified)
  }

  // Check if user is logged in, if so, display in navbar
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user){
        console.log(this.state.username + ' is logged out')
        return this.setState({ username: null })
      }
      console.log(user.phoneNumber + ' is logged in!')
      return this.setState({ username: user.phoneNumber }) 
    });
  }

  render(){

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar 
            username={this.state.username} 
            crmPersonId={this.state.crmPersonId}  
            kycVerified={this.state.kycVerified}
          />
          <Route exact path='/' component={Home} />
          <Route path='/phone' component={Phone} />
          <Route
            path='/id'
            render={ (props) => <ID 
              {...props} 
              username={this.state.username} 
              crmPersonId={this.state.crmPersonId} 
              updateParentId={this.onChangeCrmPersonId}
              updateParentKyc={this.onChangeKycStatus}
            />}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
