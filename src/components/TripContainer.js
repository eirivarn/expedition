import React from "react";
import { useState } from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import image from "../img/test.jpg";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Rating from "@mui/material/Rating";
import {addRating} from "../api/api";

export function TripContainer({ trip, calculateAverageRating }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(trip.description);
  const [tripName, setTripName] = useState(trip.tripName);
  const [authorRating, setAuthorRating] = useState(trip.authorRating);
  const [regions, setRegions] = useState(trip.region)
  const [countries, setCountries] = useState(trip.countries)

  const isAuthor =
    auth.currentUser !== null
      ? trip.authorName === auth.currentUser.displayName
      : false;

  const handleUpdateTrip = async (id) => {
    if (isAuthor) {
      const document = doc(db, "trips", id);
      await updateDoc(document, {
        description: description,
        tripName: tripName,
        authorRating: authorRating,
      });
    }
    handleToggle();
  };

  const handleToggle = () => {
    setEditing((current) => !current);
  };

  const handleDeleteButtonClick = async (id) => {
    if (isAuthor) {
      const document = doc(db, "trips", id);
      await deleteDoc(document);
    }
    navigate("/");
  };

  const getRegionValues = async () => {
      let regions = trip.region
      console.log(regions)
      console.log(regions[0])
      return regions
  }

  return (
    <div key={trip.id}>
      <textarea
        className="title"
        disabled={!editing}
        value={tripName}
        onChange={(event) => {
          setTripName(event.target.value);
        }}
      ></textarea>
      <h3 className="author">{trip.authorName}</h3>
      <img className="image" src={image} />
      <textarea
        className="tripDescription"
        disabled={!editing}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></textarea>
      <h2 className="regionVisit"> REGION </h2>
      <div className="tripRegions">regions</div>
      <h2 className="countryVisit"> COUNTRIES</h2>
      <div className="tripCountries">countries</div>
      <Rating
        className="tripRating"
        value={trip.rating[0]}
        readOnly={!editing}
        size="large"
        onChange={(event, newValue) => {
          //updateRating(trip.id, authorRating, newValue)
          setAuthorRating(newValue);
          trip.rating[0] = newValue;
          addRating(trip.id, trip.rating);
          calculateAverageRating();
        }}
      />
      <button
        className={isAuthor ? "editTripButton" : "notVisibleEditButton"}
        disabled={!isAuthor}
        onClick={
          editing
            ? () => {
                handleUpdateTrip(trip.id);
              }
            : () => handleToggle()
        }
      >
        {editing ? "Ferdig" : "Edit"}
      </button>
      <button
        className={isAuthor ? "deleteTripButton" : "notVisibleDeleteButton"}
        disabled={!isAuthor}
        onClick={() => {
          handleDeleteButtonClick(trip.id);
        }}
      >
        &#9746; Delete
      </button>
    </div>
  );
}

TripContainer.propTypes = {
  trip: PropTypes.object,
  calculateAverageRating: PropTypes.func.isRequired,
};
