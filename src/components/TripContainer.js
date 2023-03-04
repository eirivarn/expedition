import React from "react";
import { useState } from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import image from "../img/test.jpg";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export function TripContainer({ trip }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(trip.description);
  const [tripName, setTripName] = useState(trip.tripName);
  const isAuthor =
    auth.currentUser !== null
      ? trip.authorName === auth.currentUser.displayName
      : false;
  // console.log(auth.currentUser)

  const handleUpdateTrip = async (id) => {
    if (isAuthor) {
      const document = doc(db, "trips", id);
      await updateDoc(document, {
        description: description,
        tripName: tripName,
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
};
