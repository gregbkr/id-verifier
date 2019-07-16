import React, { Component } from 'react'


// class Test extends Component {
const Test = props => {

  // constructor (props) {
  //   super(props)
  // }
  
  

  // render(){
    const myvar = 'selma!'
  
    return (
      <button onClick={props.updateParentId} value={myvar}>Update from TEST</button>
    )
  // }
}

export default Test
