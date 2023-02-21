import React from "react";
//import React, { useState, useEffect } from 'react';
//import { collection, getDocs} from "firebase/firestore";
//import { db } from "../firebase-config.js";
import { UserAuth } from '../Context/AuthContext';
import {Trips} from './trips'
import "../styles/Userpage.css";

export function ProfileInfo() { //props
  //const { id } = props;
 // const [userData, setUserData] = useState(null);
  const {user} = UserAuth();
  if(!user){
    return (
        <h2 className="username">Log in with Google to see your account</h2>
    )
  }
  /*NOTE: Trips component only returns default values atm. When it's ready this can be used to find all trips
  written by the logged in user.

  const getTripsByUid = async (uid) => {
  const trips = [];
  const querySnapshot = await getDocs(collection(db, "trips"));
  querySnapshot.forEach((doc) => {
    if (doc.exists() && "uid" in doc.data()) {
      const trip = doc.data();
      trip.id = doc.id;
      if (trip.uid === uid) {
        trips.push(trip);
      }
    }
  });
  return trips;
};

getTripsByUid(user.uid).then((trips) => {
  console.log(trips);
});

*/
  return (
    <div className="profile-page">
        <h2 className="username">Navn: {user.displayName}</h2>
        <h2 className="username">E-mail: {user.email}</h2>
          <img className="profile-pic" src={user.photoURL} />
          <h2 className="your-trips">Dine reiser</h2>
          <div className="user-trips">
            <Trips />
            <Trips />
          </div>
    </div>
  );
}

export default ProfileInfo;

/*
NOTE: Har kun støtte for Google Sign-in. Hvis vi må ha mer er koden til dette ferdig skrevet

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {currentUser} = UserAuth();
  useEffect(() => {
    if(currentUser){
      const getUserData = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      setIsLoading(false);
    };
    getUserData();
    }
  }, []); //id

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData || !currentUser) {
    return <div>User not found</div>;
  }


  return (
    <div className="profile-page">

          <h2 className="username">{userData.name}</h2>
          <img className="profile-pic" src={userData.image} />

    </div>
  );
}
 */