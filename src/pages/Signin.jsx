import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/user');
    }
  }, [user]);

  return (
    <div>
      <div className='googleButton'>
        <GoogleButton id="googleButton" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;