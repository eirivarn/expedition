import React, { useState, useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import "../styles/Userpage.css";
import PropTypes from "prop-types";
import TripComponent from "../components/TripComponent.js";
import { getAllTripsByCurrentUser } from "../api/api.js";
import { NavLink } from "react-router-dom";

export function ProfileInfo() {
  const [trips, setTrips] = useState([]);
  const { user } = UserAuth();

  if (!user) {
    return (
      <div className="notLoggedIn">Log in with Google to see your account</div>
    );
  }

  useEffect(() => {
    const fetchAllTrips = async () => {
      const allTrips = await getAllTripsByCurrentUser(user);
      setTrips(allTrips);
    };
    fetchAllTrips();
  }, [user.email]);

  return (
    <div className="profile-page">
      <h2 className="username">Name: {user.displayName}</h2>
      <h2 className="username">E-mail: {user.email}</h2>
      <img className="profile-pic" src={user.photoURL} />
      <div className="user-trips ">
        <div className="flex_images">
          <h2 className="header2">My Trips</h2>
          <div className="front_grid_userpage">
            {trips.map((trip) => {
              return (
                <NavLink
                  key={trip.id}
                  to="/trip"
                  state={{ from: trip }}
                  style={{ textDecoration: "none" }}
                >
                  <TripComponent
                    tripID={trip.id}
                    name={trip.tripName}
                    ratings={trip.rating}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  trips: PropTypes.array,
};

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
