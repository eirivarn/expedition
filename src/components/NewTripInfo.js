import React, { useState } from "react";
import "../styles/NewTripPage.css";
import { Rating } from "../components/Rating.js";
import { createTrip } from "../api/api";
import { NavLink } from "react-router-dom";
import countries from "countries-list";

export function NewTripInfo() {
  const [name, setName] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [area, setArea] = useState("");
  const [ratings, setRating] = useState([]);
  const [description, setDescription] = useState("");

  const countryOptions = Object.entries(countries.countries)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onCountrySelect = (event) => {
    const countryCode = event.target.value;
    const countryName = countries.countries[countryCode]?.name;
    if (!selectedCountries.includes(countryName)) {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  const onPublishTrip = async () => {
    createTrip(name, selectedCountries, area, ratings, description);
    setName("");
    setSelectedCountries([]);
    setArea("");
    setDescription("");
    setRating([]);
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
        <select onChange={onCountrySelect} value="">
          <option value="">Select a country</option>
          {countryOptions.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <ul>
          {selectedCountries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
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
        <Rating onClick={setRating} clickable={true} ratings={ratings} />
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
