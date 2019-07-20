import React from 'react';
// import { Link } from 'react-router-dom'

const Navbar = props => {

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-3">
            <a href="/" className="brand-logo left" id="title"><i className="material-icons" id="icon">beenhere</i>ID verifier</a>
            
            <ul id="user" className="right nav-info">
                {props.username &&
                    <li><p className="nav-text"><i className="material-icons left nav-icon">phone</i>{props.username}</p></li>
                }
                {props.crmPersonId &&
                    <li><p className="nav-text"><i className="material-icons left nav-icon">account_circle</i>{props.crmPersonId}</p></li>
                }
                {   props.kycVerified &&
                    <li><p className="nav-text"><i className="material-icons left nav-icon">check</i>Kyc Verified</p></li>
                }
            </ul>
            
            </div>
        </nav>



    );
}

export default Navbar;
