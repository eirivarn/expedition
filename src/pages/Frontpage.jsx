import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import TripComponent from "../components/TripComponent.js";
import "../styles/frontpage.css";
import PropTypes from "prop-types";
import { getAllTrips } from "../api/api.js";
import { NavLink } from "react-router-dom";

const FrontPage = () => {
  const [trips, setTrips] = useState([]);

  /*   const getSpecificTrip = (id) => {
    const res = trips.filter((trip) => trip.id === id);
    return res;
  }; */

  useEffect(() => {
    const fetchAllTrips = async () => {
      const allTrips = await getAllTrips();
      setTrips(allTrips);
    };
    fetchAllTrips();
  }, []);

  return (
    <div id="body">
      <NavLink to="/newtrip" id="shareTrip" className="button" type="button">
        Share your own adventure!
      </NavLink>
      <div className="flex_images">
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
                  region={trip.region[0]}
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FrontPage.propTypes = {
  trips: PropTypes.array,
};

export default FrontPage;
