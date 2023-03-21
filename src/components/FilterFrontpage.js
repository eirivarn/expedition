import React, { useState } from "react";
import { countriesByRegion } from "../Data/CountriesByRegion.js";
import { countryList } from "../Data/countries.js";
import { searchFor } from "../api/api.js";
import { NavLink } from "react-router-dom";
import TripComponent from "../components/TripComponent.js";
import "../styles/Trippage.css";



export function FilterFrontpage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [searchMatches, setSearchMatches] = useState([]);

  const onRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const onAddCountryToSearchTerms = () => {
    if (!searchTerms.includes(selectedCountry)) {
      setSearchTerms([...searchTerms, selectedCountry]);
    }
  };

  const onAddRegionToSearchTerms = () => {
    if (!searchTerms.includes(selectedRegion)) {
      setSearchTerms([...searchTerms, selectedRegion]);
    }
  };

  const onAddTextToSearchTerms = () => {
    const terms = selectedText.split(",").map((term) => term.trim());
    const newTerms = terms.filter((term) => term && !searchTerms.includes(term));
    if (newTerms.length > 0) {
      setSearchTerms([...searchTerms, ...newTerms]);
    }
  };

  const onClearSearchTerms = () => {
    setSearchTerms([]);
  };

  const onSearch = async () => {
    const matches = await searchFor(searchTerms);
    setSearchMatches(matches);
  };

  return (
    <div>
      <h2 id="region" className="header2"> REGION </h2>
      <div id="regionVisited" className="userInputRegionVisited">
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
        <button id="regionButton" type="button" onClick={onAddRegionToSearchTerms}>Add region to search terms</button>
      </div>
      <h2 className="header2"> COUNTRY </h2>
      <div id="countriesVisited" className="userInputCountriesVisited">
        <select
          className="dropdown"
          value={selectedCountry}
          onChange={(event) => {
            onCountrySelect(event.target.value);
          }}
        >
          <option value="">Select a country</option>
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <button id="countryButton" onClick={onAddCountryToSearchTerms}>Add country to search terms</button>
      </div>
      <div className="userInputText">
        <input
          type="text"
          placeholder="Enter search terms separated by commas"
          value={selectedText}
          onChange={(event) => {
            setSelectedText(event.target.value);
          }}
        />
        <button id="addTextButton" onClick={onAddTextToSearchTerms}>Add terms</button>
      </div>
      <ul id="countriesList">
        {searchTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
      <button id="clearButton" onClick={onClearSearchTerms}>Clear terms</button>
      <button id="searchButton" onClick={onSearch}>Search</button>
      <h2 className="header2">Trips that match searchTerms</h2>
      <div className="front_grid">
      {searchMatches.map((trip) => {
    const ratings = trip.rating;
    const average = Math.round(
      ratings.reduce((a, b) => a + b, 0) / ratings.length
    );
    return (
      <NavLink
        key={trip.id}
        to="/trip"
        state={{ from: trip }}
        style={{ textDecoration: "none" }}
      >
        <TripComponent
          tripID={trip.id}
          name={trip.tripName}
          averageRating={average}
        />
      </NavLink>
    );
  })}
  </div>
</div>
  )}
