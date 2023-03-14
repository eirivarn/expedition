import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import TripComponent from "../components/TripComponent.js";
//import ToplistComponent from "../components/ToplistComponent.js";
import "../styles/frontpage.css";
import "../styles/toplist.css";
import PropTypes from "prop-types";
import { getAllTrips } from "../api/api.js";
import { NavLink } from "react-router-dom";

import image from "../img/test.jpg";

const FrontPage = () => {
  const [trips, setTrips] = useState([]);
  //  const [toplist, setToplist] = useState([]);

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
      {/*Alle reisene på forsiden */}
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
                />
              </NavLink>
            );
          })}
        </div>
      </div>

      {/*Topplisten */}
      <div id="toplist"></div>
      <h2>Top list</h2>
      <div id="toplist_grid">
        <div className="toplist_numbered">
          <h1>1</h1>
          <img src={image}></img>
          <div id="toplist_name_and_rating">
            <h3>Name trip</h3>
            <h4>RATING</h4>
          </div>
        </div>
        <div className="toplist_numbered">
          <h1>2</h1>
        </div>
        <div className="toplist_numbered">
          <h1>3</h1>
        </div>
        <div className="toplist_numbered">
          <h1>4</h1>
        </div>
        <div className="toplist_numbered">
          <h1>5</h1>
        </div>
        <div className="toplist_numbered">
          <h1>6</h1>
        </div>
      </div>
    </div>
  );
};

FrontPage.propTypes = {
  trips: PropTypes.array,
};

export default FrontPage;
