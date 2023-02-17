import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import logo from '../img/xpedition_logo.png';
import '../frontpage.css';
//import userIcon from '../img/user.png';


    const Header = () => {
        const { user, logOut } = UserAuth();
      
        const handleSignOut = async () => {
          try {
            await logOut()
          } catch (error) {
            console.log(error)
          }
        }

        return (
            <div id="header">
              <NavLink to="/">
                <img id="logo" src={logo}></img>
                </NavLink>
                {user?.displayName ? (
                    <button id="login" className='button' type='button' onClick={handleSignOut}>Logout</button>
                ) : (
                    <Link id="login" className='button' type='button' to='/signin'>Sign in</Link>
                )}
            </div>
        )
    };

export default Header;
