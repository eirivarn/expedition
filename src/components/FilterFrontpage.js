import React, { useState } from "react";
import { countriesByRegion } from "../Data/CountriesByRegion.js";
import { countryList } from "../Data/countries.js";


export function FilterFrontpage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);

  const onRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const onAddToSearchTerms = () => {
    const newSearchTerms = selectedRegion.concat(" ", selectedCountry)
      .split(/[, ]+/)
      .filter((term) => term !== "");
    setSearchTerms([...searchTerms, ...newSearchTerms]);
  };

  const onClearSearchTerms = () => {
    setSearchTerms([]);
  };

  return (
    <div>
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
        <button onClick={onAddToSearchTerms}>Add to search terms</button>
      </div>
      <div className="userInputCountriesVisited">
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
        <button onClick={onAddToSearchTerms}>Add to search terms</button>
      </div>
      <ul id="countriesList">
        {searchTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
      <button onClick={onClearSearchTerms}>Clear search terms</button>
    </div>
  );
}
