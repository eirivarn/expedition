import React from 'react';
import {ProfileInfo} from "../components/ProfileInfo.js"
//import { TripContainer } from "../components/TripContainer.js";
import "../styles/Userpage.css";


const UserPage  = () => {

  return(
      <div className="profile-page">
        <h1>Profiloversikt</h1>
        <ProfileInfo />
        <h2 className="your-trips">Dine reiser</h2>
      </div>// <TripContainer />
  )
};


export default UserPage;