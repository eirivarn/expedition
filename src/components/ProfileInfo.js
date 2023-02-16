import React from "react";
import "../styles/Userpage.css";

export function ProfileInfo() {
  return (
    <div className='Porfileinfocontainer'>
     <h2 className="username">Ola Nordmann</h2>
     <img className="profile-pic" src={require("../img/user.png")}/>
    </div>
  );
}

export default ProfileInfo;
