import React, { useState } from "react";
import "../styles/NewTripPage.css";
import { Rating } from "../components/Rating.js";
import { createTrip } from "../api/api";
import { NavLink } from "react-router-dom";


export function NewTripInfo() {
  //Innit blanc states
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [area, setArea] = useState("");
  const [ratings, setRating] = useState([]);
  const [description, setDescription] = useState("");


  //TODO Legge til ratings som array, legge til egen rating som element ved innit.  legge til area, comments som tom array.
  const onRatingClick = async (innitRating) => {
    setRating([]);
    ratings.push(innitRating);
  };

  const onPublishTrip = async () => {
    createTrip(name, countries, area, ratings, description);
    setName("");
    setCountries([]);
    setArea("");
    setDescription("");
    setRating("");
  };


  return (
    <div>
      <h1 className="title"> Add a New Trip</h1>
      <h2 className="nameOfTrip"> TRIP-NAME</h2>
      <div className="userInputNameOfTrip">
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
       </div>

      <h2 className="countriesVisited"> COUNTRY </h2>
      <div className="userInputCountriesVisited">
        <input
          type="text"
          value={countries}
          onChange={(event) => {
            setCountries(event.target.value.split(","));
          }}
        />
      </div>
      <h2 className="areaVisited"> AREA </h2>
      <div className="userInputAreaVisited">
        <input
          type="text"
          value={area}
          onChange={(event) => {
            setArea(event.target.value);
          }}
        />
      </div>
      <h2 className="ratinHeader"> RATING </h2>
      <div className="rating">
        <Rating onClick={onRatingClick} clickable={true} ratings={[]} />
      </div>
      <h2 className="description"> DESCRIPTION </h2>
      <div className="userInputDescription">
        <textarea
          type="text"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <button className="publishTripButon" onClick={onPublishTrip}>
        <div className="buttonText">
          <NavLink to="/" type="button">
            Publish Trip
          </NavLink>
        </div>
      </button>
    </div>
  );
}
