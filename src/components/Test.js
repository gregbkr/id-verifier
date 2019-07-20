import React, { Component } from 'react'

const promise1 = new Promise(function(resolve, reject) {
  resolve('9999!');
});

class Test extends Component {
// const Test = props => {

  constructor (props) {
    super(props)
    this.state = { 
      pic: 'hello'
    }    
  }
  
  onClick = () => {
    promise1.then(value => {
      console.log(value);
      // expected output: "Success!"
      this.props.updateParentId(value)      
    });
  }

  render(){
    return (
        <button onClick={this.onClick}>Update from TEST</button>
    )
  }
}

export default Test
