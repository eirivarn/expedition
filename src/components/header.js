import React from 'react';
import '../header.css';
import logo from '../img/xpedition_logo.png';
import userIcon from '../img/user.png';


export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: true};
    }
    
    handleLoginClick () {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick () {
        this.setState({isLoggedIn: false});
    }



    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let logButton;
        let userButton;

        if (isLoggedIn) {
            logButton = <button id="login" className='button' type='button' onClick={this.handleLogoutClick}>Logg ut</button>
            userButton = <button id='userButton'> <img src={userIcon} height='50px' width='50px'></img> </button>
        }
        else {
            logButton = <button id='login' className='button' type='button' onClick={this.handleLoginClick}>Logg inn</button>
            userButton = null;

        }


        return (
            <div id="header">
                <img id="logo" src={logo}></img>
                {userButton}
                {logButton}
            </div>
        )
    }
}