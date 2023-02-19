import React, { useState } from "react";
import "../styles/NewTripPage.css";
import { Rating } from "../components/Rating.js";
import { createTrip } from "../api/api";

export function NewTripInfo() {
  //Innit blanc states
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [description, setDescription] = useState("");

  const onPublishTrip = async () => {
    console.log(name);
    console.log(countries);
    console.log(description);
    createTrip(name, countries, description);
    setName("");
    setCountries([]);
    setDescription("");
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
      <h2 className="countriesVisited"> Land</h2>
      <div className="userInputCountriesVisited">
        <input
          type="text"
          value={countries}
          onChange={(event) => {
            setCountries(event.target.value.split(","));
          }}
        />
      </div>
      <h2 className="ratinHeader"> Rating </h2>
      <div className="rating ">
        <Rating />
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
