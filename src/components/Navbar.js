import React from 'react';
// import { Link } from 'react-router-dom'
import firebase from '../firebase'

const Navbar = props => {

    const logout = () => {
        firebase.auth().signOut().then(() => {  
            console.log('User has logged out with success');
        })
        props.updateParentId(false)
        props.updateParentKyc(false)
    };

    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
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
                {   props.username &&
                    <li><a href='/' className="waves-effect waves-light btn grey lighten-1 black-text nav-btn-logout" id="nav-btn-logout" onClick={logout}>Logout</a></li>
                }
            </ul>
            
            </div>
        </nav>



    );
}

export default Navbar;
