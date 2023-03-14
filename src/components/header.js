import React from "react";
import {Darkmode} from './Darkmode.js';
import "../styles/header.css";
import { UserAuth } from "../Context/AuthContext";
import logo from "../img/xpedition_logo.png";
//import "../styles/frontpage.css";
import { NavLink} from 'react-router-dom';
import userIcon from '../img/user.png';
//import { useScrollDirection } from "../hooks/headerScroll";
//import {DarkToggle} from './Darkmode.js';



const Header = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

 // const scrollDirection = useScrollDirection();
  

  return (
    <div id="header">
      <div>
      <NavLink to="/">
        <img id="logo" src={logo}></img>
      </NavLink>
      <NavLink to="/user">
        <img id="userButton" src={userIcon}></img>
      </NavLink>
      {user?.displayName ? (
        <NavLink
          id="login"
          className="button"
          type="button"
          onClick={handleSignOut}
        >
          Log out
        </NavLink>
      ) : (
        <NavLink id="login" className="button" type="button" to="/signin">
          Log in
        </NavLink>
      )}
      <Darkmode></Darkmode>
      </div>
    </div>
  );
};

export default Header;
