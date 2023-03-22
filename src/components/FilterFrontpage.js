import React, { useState } from "react";
import { countriesByRegion } from "../Data/CountriesByRegion.js";
import { countryList } from "../Data/countries.js";
import { searchFor } from "../api/api.js";
import { NavLink } from "react-router-dom";
import TripComponent from "../components/TripComponent.js";
/*import "../styles/Trippage.css";*/
import "../styles/filter.css";

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
    const newTerms = terms.filter(
      (term) => term && !searchTerms.includes(term)
    );
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
    <div id="filter_flex_whole">
      <div className="input_container">
        <div id="filter_select">
          <div id="filter_flex1">
            <div id="regionVisited">
              <select
                className="filter_dropdown"
                value={selectedRegion}
                onChange={(event) => {
                  onRegionSelect(event.target.value);
                }}
              >
                <option value="">Region</option>
                {Object.keys(countriesByRegion).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <button
                id="addButton1"
                className="button"
                onClick={onAddRegionToSearchTerms}
              >
                Add
              </button>
            </div>
            <div id="countriesVisited">
              <select
                className="filter_dropdown"
                value={selectedCountry}
                onChange={(event) => {
                  onCountrySelect(event.target.value);
                }}
              >
                <option value="">Country</option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <button
                id="addButton2"
                className="button"
                onClick={onAddCountryToSearchTerms}
              >
                Add
              </button>
            </div>
          </div>
          <div id="filter_list">
            <ul id="countriesList">
              {searchTerms.map((term, index) => (
                <li className="listElement" key={index}>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="filter_flex2">
          <div id="filter_searchbar">
            <input
              id="filter_userInputText"
              type="text"
              placeholder="Search"
              value={selectedText}
              onChange={(event) => {
                setSelectedText(event.target.value);
              }}
            />
            <button
              id="addButton3"
              className="button"
              onClick={onAddTextToSearchTerms}
            >
              Add
            </button>
          </div>
          <div id="filter_buttons">
            <button
              id="clearButton"
              className="lightbutton"
              onClick={onClearSearchTerms}
            >
              Clear all
            </button>
            <button id="searchButton" className="button" onClick={onSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div id="output_container">
        <h2 className="header2">Trips that match the search terms</h2>
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
                  region={trip.region[0]}
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
