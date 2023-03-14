import React from "react";
import "../styles/Trippage.css";
import heartIcon from "../img/heart.svg";
import "firebase/auth";
import "firebase/firestore";
import PropTypes from "prop-types";
import { updateDoc, collection, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
//Bruker kode som er kommentert ut for testing.
import { searchFor } from "../api/api";


//Lagrer basert på hva som sendes til handleOnClick lagres ulik data til arrayet.
export function AddToFavorites({ trip }) {
  const handleOnClick = async (trip) => {
    const userEmail = auth.currentUser.email;
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, userEmail);
    const getdoc = await getDoc(docRef);
    const updatedFavoritedTrips = [...getdoc.data().favoritedTrips, trip];
    if (getdoc.data().favoritedTrips.includes(trip)) {
      /*console.log("Denne turen er allerede i databasen");
      console.log("-------")
      const sortedTrips = await getSortedTripByCountriesAndRegions([],["North America"]);
      console.log(sortedTrips);
      console.log("-------")
      console.log(getSortedTripsByRating(sortedTrips));
      */
      console.log(searchFor(["TESTTRIP"]));
      


    } else {
      console.log(
        "Denne turen var ikke favoritt fra før, den blir lagt til nå :)"
      );
      await updateDoc(docRef, { favoritedTrips: updatedFavoritedTrips });
    }
  };



  return (
    <div
      id="addFavoriteShowBox"
      className="lightbutton"
      onClick={() => {
        handleOnClick(trip.id); // <-- Hva som sendes inn her lagres som favoritedTrip
    
      }}
    >
      <div id="addFavoriteShowText"> Add to favorite</div>
      <div id="addFavoriteShowHeart">
        <img id="heartIcon2" src={heartIcon}></img>
      </div>
    </div>
  );
}

AddToFavorites.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
