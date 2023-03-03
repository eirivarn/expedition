import React from "react";
import { useState } from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import image from "../img/test.jpg";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export function TripContainer({ trip }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(trip.description);

  const handleUpdatingDescription = async (id) => {
    if (trip.userMail !== auth.currentUser) {
      const document = doc(db, "trips", id);
      await updateDoc(document, {description: text})
    }
    handleToggle()
  }

  const handleToggle = () => {
    setEditing((current) => !current);
  }

  const handleDeleteButtonClick = async (id) => {
    if (trip.userMail !== auth.currentUser) {
      const document = doc(db, "trips", id);
      await deleteDoc(document);
    }
    navigate("/")
  }

  return (
    <div key={trip.id}>
        <h1 className="title">{trip.tripName}</h1>
        <h3 className="author">{trip.authorName}</h3>
        <img className="image" src={image} />
        <textarea 
          className="tripDescription"
          disabled={!editing}
          value={text} 
          onChange={(event) => {setText(event.target.value)}}>
        </textarea>
        <button 
          className="editTripButton" 
          onClick={editing ? () => {handleUpdatingDescription(trip.id)} : () => handleToggle()}> 
          {editing ? "Ferdig" : "Edit"}
        </button>
        <button 
          className="deleteTripButton" 
          onClick={() => {handleDeleteButtonClick(trip.id)}}>
          &#9746; Delete
        </button>

    </div>
  );
}

TripContainer.propTypes = {
  trip: PropTypes.object,
};
