import React from "react";
import "..//styles/frontpage.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";

const TripComponent = ({ name, handleClick }) => {
  return (
    <div className="trips" onClick={handleClick}>
      <img className="tripImage" src={image}></img>
      <h2 className="reiseNavn">{name}</h2>
    </div>
  );
};

TripComponent.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
};

export default TripComponent;
