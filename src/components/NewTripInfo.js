import React, { useState } from "react";
import "../styles/NewTripPage.css";
import Rating from "@mui/material/Rating";
import { createTrip } from "../api/api";
import { NavLink } from "react-router-dom";
import { countriesByRegion } from "../Data/CountriesByRegion.js";

export function NewTripInfo() {
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [visitedRegions, setVisitedRegions] = useState([]);
  const [ratings, setRating] = useState([]);
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState([]);

  const onRatingClick = async (innitRating) => {
    setRating([]);
    ratings.push(innitRating);
  };

  const onAddCountry = () => {
    if (selectedCountry !== "" && !countries.includes(selectedCountry)) {
      setCountries([...countries, selectedCountry]);
      if (!visitedRegions.includes(selectedRegion)) {
        setVisitedRegions([...visitedRegions, selectedRegion]);
      }
      setSelectedCountry("");
    }
  };

  const onPublishTrip = async () => {
    createTrip(name, countries, visitedRegions, ratings, description);
    setName("");
    setCountries([]);
    setSelectedRegion("");
    setVisitedRegions([]);
    setDescription("");
    setRating(0);
  };

  const onRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedCountry("");
  };

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
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

      <h2 className="regionVisited"> REGION </h2>
      <h2 className="countriesVisited"> COUNTRY </h2>
      <div className="userInputRegionVisited">
        <select
          className="dropdown"
          value={selectedRegion}
          onChange={(event) => {
            onRegionSelect(event.target.value);
          }}
        >
          <option value="">Select a region</option>
          {Object.keys(countriesByRegion).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {selectedRegion !== "" && (
        <>
          <div className="userInputCountriesVisited">
            <select
              className="dropdown"
              value={selectedCountry}
              onChange={(event) => {
                onCountrySelect(event.target.value);
              }}
            >
              <option value="">Select a country</option>
              {countriesByRegion[selectedRegion].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button id="addCountryButton" onClick={onAddCountry}>
              Add
            </button>
            <ul id="countriesList">
              {countries.map((country) => (
                <li id="listElement" key={country}>
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </>
        )}
      <h2 className="ratinHeader"> RATING </h2>
      <div className="rating">
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        />
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

