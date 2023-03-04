import React from "react";
import "../styles/frontpage.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const TripComponent = ({ name, handleClick, ratings }) => {
  const average = Math.round(
    ratings.reduce((a, b) => a + b, 0) / ratings.length
  );

  return (
    <div className="trips" onClick={handleClick}>
      <img className="tripImage" src={image}></img>
      <Rating name="tripRating" value={average} size="small" readOnly />
      <h2 className="reiseNavn">{name}</h2>
    </div>
  );
};

TripComponent.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  ratings: PropTypes.array,
};

export default TripComponent;
