import React from 'react';
import {ProfileInfo} from "../components/ProfileInfo.js"
//import { TripContainer } from "../components/TripContainer.js";
import "../styles/Userpage.css";


const UserPage  = () => {

  return(
      <div className="profile-page">
        <ProfileInfo />
        <h2 className="your-trips">Dine reiser</h2>
          <div className="user-trips">
              <div className="rec">
              </div>
          </div>
      </div>// <TripContainer />
  )
};


export default UserPage;