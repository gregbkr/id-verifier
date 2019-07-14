import React from 'react';
// import { Link } from 'react-router-dom'

const Navbar = props => {
    console.log ('1 ----------')
    console.log (props.username)
    console.log (props.userLogged)
    console.log ('2 ----------')
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-3">
            <a href="/" className="brand-logo" id="title"><i className="material-icons" id="icon">beenhere</i>ID verifier</a>
            {props.username &&
                <ul id="user" className="right hide-on-med-and-down">
                    <li><a href="#"><i className="material-icons left">account_circle</i>{props.username}</a></li>
                </ul> 
            }
            </div>
        </nav>



    );
}

export default Navbar;
