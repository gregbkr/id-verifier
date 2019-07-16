import React from 'react';
// import { Link } from 'react-router-dom'

const Navbar = props => {

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-3">
            <a href="/" className="brand-logo" id="title"><i className="material-icons" id="icon">beenhere</i>ID verifier</a>
            
            <ul id="user" className="right hide-on-med-and-down">
                {props.username &&
                    <li><a href="#"><i className="material-icons left">phone</i>{props.username}</a></li>
                }
                {props.crmPersonId &&
                    <li><a href="#"><i className="material-icons left">account_circle</i>{props.crmPersonId}</a></li>
                }
                {props.kycVerified &&
                    <li><a href="#"><i className="material-icons left">check</i></a></li>
                }
            </ul> 
            
            </div>
        </nav>



    );
}

export default Navbar;
