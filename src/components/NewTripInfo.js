import React from "react";
import "../styles/NewTripPage.css";
import { Rating } from "../components/Rating.js";

export function NewTripInfo() {
  return (
    <div>
      <h1 className="title"> Legg til ny reise</h1>
      <h2 className="nameOfTrip"> Navnet på reisen</h2>
      <div className="userInputNameOfTrip" />
      <h2 className="countriesVisited"> Land</h2>
      <div className="userInputCountriesVisited" />
      <h2 className="ratinHeader"> Rating </h2>
      <div className="rating ">
        <Rating />
      </div>
      <h2 className="description"> Beskrivelse </h2>
      <div className="userInputDescription" />
      <div className="publishTripButon">
        <div className="buttonText">Publiser reise</div>
      </div>
    </div>
  );
}
