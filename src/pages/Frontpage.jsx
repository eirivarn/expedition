import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import TripComponent from "../components/TripComponent.js";
import "../styles/frontpage.css";
import PropTypes from "prop-types";
import { getAllTrips, searchFor } from "../api/api.js";
import { NavLink } from "react-router-dom";
import calculateWeights from "../utils/calculateWeights.js";
import { auth } from "../firebase-config.js";
import sortWeights from "../utils/sortWeights.js";
import adHeader from "../img/nidarHeader.png";

const FrontPage = () => {
  const [trips, setTrips] = useState([]);
  const [recommendedTrips, setReccommendedTrips] = useState([]);


  useEffect(() => {
    const fetchAllTrips = async () => {
      const allTrips = await getAllTrips();
      setTrips(allTrips);
    };

    const getRecommendedTrips = async () => {
      const userId = auth.currentUser.email;
      const weights = await calculateWeights(userId);
      const topFourWeights = sortWeights(weights);
      const allTripsMatchingWeights = await searchFor(topFourWeights);
      const shuffled = allTripsMatchingWeights.sort(() => 0.5 - Math.random());
      let fourTrips = shuffled.slice(0, 4);
      setReccommendedTrips(fourTrips);
    };


    fetchAllTrips();
    getRecommendedTrips();
  }, []);

  return (
    <div id="body">
      <NavLink to="/newtrip" id="shareTrip" className="button" type="button">
        Share your own adventure!
      </NavLink>
      <div className="flex_images">
        <h2 className="header2">{auth.currentUser && "Recommended For You"}</h2>
        <div className="front_grid">
          {recommendedTrips.map((trip) => {
            const ratings = trip.rating;
            const average = Math.round(
              ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
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
                  averageRating={average}
                />
              </NavLink>
            );
          })}
        </div>
        <h2 className="header2">Trips</h2>
        <div className="front_grid">
          {trips.map((trip) => {
            const ratings = trip.rating;
            const average = Math.round(
              ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
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
                  averageRating={average}
                />
              </NavLink>
            );
          })}
        </div>
        <a href="https://nidarkampanje.nidar.no/nidar-ving-kampanje/">
          <img className="adHeader" src={adHeader} alt="Ad Header" />
        </a>
      </div>
    </div>
  );
};

FrontPage.propTypes = {
  trips: PropTypes.array,
};

export default FrontPage;
