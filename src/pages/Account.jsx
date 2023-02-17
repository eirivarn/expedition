import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../frontpage.css';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='accountPage'>
      <h1 className='h1Account'>Account</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} id="logout" className='button' type='button'>
        Logout
      </button>
    </div>
  );
};

export default Account;