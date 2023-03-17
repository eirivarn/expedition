import React, { useState } from "react";
import { countriesByRegion } from "../Data/CountriesByRegion.js";
import { countryList } from "../Data/countries.js";


export function FilterFrontpage() {
    const [selectedCountry, setSelectedCountry] = useState(countryList[0].name);
    const [selectedRegion, setSelectedRegion] = useState("");
    console.log(countryList);

  const onRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const onCountrySelect = (country) => {
    setSelectedCountry(country);
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

  <ul id="countriesList">
  </ul>
</div>

    </div>
  );
}

