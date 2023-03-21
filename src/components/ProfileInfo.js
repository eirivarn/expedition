import React, { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import "../styles/Userpage.css";
import PropTypes from "prop-types";
import TripComponent from "../components/TripComponent.js";
import { getAllTripsByCurrentUser, getFavoritedTrips } from "../api/api.js";
import { NavLink } from "react-router-dom";
import heartIcon from "../img/heart.svg";
import locationIcon from "../img/location.svg";

export function ProfileInfo() {
  const [trips, setTrips] = useState([]);
  const [showTrips, setShowTrips] = useState(true); // show trips by default
  const { user } = UserAuth();

  if (!user) {
    return (
      <div className="notLoggedIn">Log in with Google to see your account</div>
    );
  }

  const handleShowTrips = async () => {
    const allTrips = await getAllTripsByCurrentUser(user);
    setTrips(allTrips);
    setShowTrips(true);
    console.log("Show all trips");
  };

  const handleShowFavorites = async () => {
    const favoritedTrips = await getFavoritedTrips(user);
    setTrips(favoritedTrips);
    setShowTrips(true);
    console.log("Show all favorited trips");
  };

  const tripsToRender = showTrips ? trips : trips;

  return (
    <div className="profile-page">
      <h2 className="username">Name: {user.displayName}</h2>
      <h2 className="username">E-mail: {user.email}</h2>
      <img className="profile-pic" src={user.photoURL} />
      <div className="user-trips ">
        <div className="MyTripArea">
          <div id="addMyTripsShowBox" className="lightbutton" onClick={handleShowTrips}>
            <div>
              <img id="locationIcon" src={locationIcon}></img>
            </div>
            <div className="addMyTripsShowText">My Trips</div>
          </div>
        </div>
        <div className="MyFavoritesArea">
          <div id="addFavoriteShowBox" className="lightbutton" onClick={handleShowFavorites}>
            <div className="addFavoriteShowText">My Favorites</div>
            <div className="addFavoriteShowHeart">
              <img id="heartIcon" src={heartIcon}></img>
            </div>
            
          </div>
        </div>
        <div className="flex_images">
          <h2 className="header2">{showTrips ? "My Trips" : "My Favorites"}</h2>
          <div className="front_grid_userpage">
            {tripsToRender.map((trip) => {
              return (
                <NavLink
                  key={trip.id}
                  to="/trip"
                  state={{ from: trip }}
                  style={{ textDecoration: "none" }}
                >
                  <TripComponent
                    key={trip.id}
                    tripID={trip.id}
                    name={trip.tripName}
                    ratings={trip.rating}
                    region={trip.region[0]}
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
