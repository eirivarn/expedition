import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import TripComponent from "../components/TripComponent.js";
//import ToplistComponent from "../components/ToplistComponent.js";
import "../styles/frontpage.css";
import "../styles/toplist.css";
import PropTypes from "prop-types";
import { getAllTrips, searchFor } from "../api/api.js";
import { NavLink } from "react-router-dom";
import calculateWeights from "../utils/calculateWeights.js";
import { auth } from "../firebase-config.js";
import sortWeights from "../utils/sortWeights.js";

import image from "../img/test.jpg";

const FrontPage = () => {
  const [trips, setTrips] = useState([]);
  //  const [toplist, setToplist] = useState([]);
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
      {/*Alle reisene på forsiden */}
      <div className="flex_images">
        <h2 className="header2">{auth.currentUser && "Recommended For You"}</h2>
        <div className="front_grid">
          {recommendedTrips.map((trip) => {
            const ratings = trip.rating;
            const average = Math.round(
              ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
            return (
              <div key={trip.id}>
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
              </div>
            );
          })}
          <div className="sectionLineBreak"></div>
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
      </div>

      {/*Topplisten */}
      <div id="toplist">
        <h2>Top list</h2>
        <div id="toplist_grid">
          {/*1 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>1</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
          {/*2 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>2</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
          {/*3 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>3</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
          {/*4 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>4</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
          {/*5 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>5</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
          {/*6 */}
          <div className="toplist_component">
            <div className="toplist_numberbox">
              <h1>6</h1>
            </div>

            <img src={image}></img>
            <div id="toplist_name_and_rating">
              <h3>Name trip</h3>
              <h4>RATING</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrontPage.propTypes = {
  trips: PropTypes.array,
};

export default FrontPage;
