import React from "react";
import "../styles/frontpage.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const TripComponent = ({ name, handleClick, averageRating }) => {
  return (
    <div className="trips" onClick={handleClick}>
      <img className="tripImage" src={image}></img>
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
};

export default TripComponent;
