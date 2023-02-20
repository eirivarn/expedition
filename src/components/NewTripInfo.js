import React, { useState } from "react";
import "../styles/NewTripPage.css";
import { Rating } from "../components/Rating.js";
import { createTrip, getAllTrips } from "../api/api";

export function NewTripInfo() {
  //Innit blanc states
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [area, setArea] = useState("");
  const [ratings, setRating] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState();

  //TODO Legge til ratings som array, legge til egen rating som element ved innit.  legge til area, comments som tom array.

  const onRatingClick = async (innitRating) => {
    setRating([]);
    ratings.push(innitRating);
  };

  const onPublishTrip = async () => {
<<<<<<< HEAD
    createTrip(name, countries, area, ratings, description);
    setName("");
    setCountries([]);
    setArea("");
=======
    console.log(name);
    console.log(countries);
    //console.log(rating);
    console.log(description);
    createTrip(name, countries, description);
    setName("");
    setCountries([]);
    setRating();
>>>>>>> c662faa (Cleanup remaining #TODOS: Rating, navigating, CSS)
    setDescription("");
    setRating("");
  };

  return (
    <div>
      <h1 className="title"> Legg til ny reise</h1>
      <h2 className="nameOfTrip"> Navnet på reisen</h2>
      <div className="userInputNameOfTrip">
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <h2 className="countriesVisited"> Land </h2>
      <div className="userInputCountriesVisited">
        <input
          type="text"
          value={countries}
          onChange={(event) => {
            setCountries(event.target.value.split(","));
          }}
        />
      </div>
      <h2 className="areaVisited"> Area </h2>
      <div className="userInputAreaVisited">
        <input
          type="text"
          value={area}
          onChange={(event) => {
            setArea(event.target.value);
          }}
        />
      </div>
      <h2 className="ratinHeader"> Rating </h2>
      <div className="rating">
        <Rating onClick={onRatingClick} />
      </div>
      <h2 className="description"> Beskrivelse </h2>
      <div className="userInputDescription">
        <input
          type="text"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <button className="publishTripButon" onClick={onPublishTrip}>
        <div className="buttonText">Publiser reise</div>
      </button>
    </div>
  );
}
