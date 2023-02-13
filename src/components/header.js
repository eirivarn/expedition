import React from 'react';
import '../frontpage.css';
import logo from '../img/xpedition_logo.png';


export class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <img id="logo" src={logo}></img>
                <button id="login" className="button" type="button">Logg inn</button>
            </div>
        )
    }
}