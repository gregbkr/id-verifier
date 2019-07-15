import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Phone from './components/Phone'
import ID from './components/ID'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

class App extends Component {

  constructor (props) {
    super()
    this.state = { 
      userLogged: true,
      username: false
    }

  }


  render(){

    // Update state username 
    const updateUsername = (name) => {
      this.setState({username: name})
      console.log('4----------------')
      console.log(this.state.username)
      console.log('5----------------')
    }

    // check if user if already loggedIn
    const checkIfLoggedIn = () => { 
      firebase.auth().onAuthStateChanged(function(user){
        if (!user) {
            return console.log('No user is logged in!')
            // props.userLogged = false
        }
        console.log(user.phoneNumber + ' is logged in')
        updateUsername(user.phoneNumber)
      })
    }
    // Refresh what's is visible on screen after page updates
    window.onload = function(){
      checkIfLoggedIn()
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar username={this.state.username} />
          <Route exact path='/' component={Home} />
          <Route path='/phone' component={Phone} />
          <Route
            path='/id'
            render={ (props) => <ID {...props} user={this.state.username} />}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
