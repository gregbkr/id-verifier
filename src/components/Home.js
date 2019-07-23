import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    
    // redirectToTarget = (user) => {
    //     this.props.history.push('/phone')
    //   }

    return (
        <div className="start center-align">
            <h4>Validate your identity </h4>
            <p>Use this portal to validate your ID in 2 steps</p>
            <Link to='/phone'><button className="btn orange darken-3 btn-primary home-btn">Start</button></Link>
        </div>
    )
}

export default Home;