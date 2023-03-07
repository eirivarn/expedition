import React from "react";
import "../styles/Trippage.css";
import heartIcon from "../img/heart.png";
import "firebase/auth";
import "firebase/firestore";
import PropTypes from "prop-types";
import { updateDoc, collection, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";

//Lagrer basert på hva som sendes til handleOnClick lagres ulik data til arrayet.
export function AddToFavorites({ trip }) {
  const handleOnClick = async (trip) => {
    const userEmail = auth.currentUser.email;
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, userEmail);
    const getdoc = await getDoc(docRef);
    const updatedFavoritedTrips = [...getdoc.data().favoritedTrips, trip];
    if (getdoc.data().favoritedTrips.includes(trip)) {
      console.log("Denne turen er allerede i databasen");
    } else {
      console.log(
        "Denne turen var ikke favoritt fra før, den blir lagt til nå :)"
      );
      await updateDoc(docRef, { favoritedTrips: updatedFavoritedTrips });
    }
  };

  return (
    <div
      className="addFavoriteShowBox"
      onClick={() => {
        handleOnClick(trip.id); // <-- Hva som sendes inn her lagres som favoritedTrip
      }}
    >
      <div className="addFavoriteShowText">Add to favorites</div>
      <div className="addFavoriteShowHeart">
        <img id="heartIcon" src={heartIcon}></img>
      </div>
    </div>
  );
}

AddToFavorites.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};