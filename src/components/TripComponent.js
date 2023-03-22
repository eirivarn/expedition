import React from "react";
import "../styles/frontpage.css";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { getImage } from "../Data/CountriesByRegion";


const TripComponent = ({ name, handleClick, averageRating, region }) => {
  return (
    <div className="trips" onClick={handleClick}>
      <img className="tripImage" src={getImage(region)}></img>
      <div className="tripAvgRating">
        <Rating value={averageRating} size="medium" readOnly />
      </div>
      <h2 className="reiseNavn">{name}</h2>
    </div>
  );
};

TripComponent.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  averageRating: PropTypes.number,
  region: PropTypes.string,
};

export default TripComponent;
