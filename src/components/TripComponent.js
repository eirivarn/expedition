import React from "react";
import "..//styles/frontpage.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";

const TripComponent = ({ tripID, name }) => {
  return (
    <div className="trips">
      <a href="">
        <img className="tripImage" src={image}></img>
      </a>

      <h2 className="reiseNavn">{name}</h2>
    </div>
  );
};

TripComponent.propTypes = {
  tripID: PropTypes.string,
  name: PropTypes.string,
};

export default TripComponent;
