import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import TripComponent from "../components/TripComponent.js";
import "../styles/frontpage.css";
import PropTypes from "prop-types";
import { getAllTrips } from "../api/api.js";

const FrontPage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchAllTrips = async () => {
      const allTrips = await getAllTrips();
      setTrips(allTrips);
    };
    fetchAllTrips();
  }, []);

  return (
    <div id="body">
      <button id="shareTrip" className="button" type="button">
        {" "}
        Del din egen reise!{" "}
      </button>
      <div className="flex_images">
        <h2 className="header2">Reiseruter</h2>
        <div className="front_grid">
          {trips.map((trip) => {
            console.log("trip.tripName", trip.tripName);
            return (
              <TripComponent
                key={trip.id}
                tripID={trip.id}
                name={trip.tripName}
              />
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
