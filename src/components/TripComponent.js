import React from "react";
import "..//styles/frontpage.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";

const TripComponent = ({ name, handleClick, ratings }) => {
  const average = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);

  return (
    <div className="trips" onClick={handleClick}>
      <img className="tripImage" src={image}></img>
      <h3 id="tripRating">
        {[...Array(5)].map((circle, ind) => {
          ind += 1;
          return (
            <button
              type="button"
              className={ind <= average ? "ratingOn" : "ratingOff"}
              key={average}
            >
              <span className="circleGroup">&#11044;</span>
            </button>
          );
        })}
      </h3>
      <h2 className="reiseNavn">{name}</h2>
    </div>
  );
};

TripComponent.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  ratings: PropTypes.array
};

export default TripComponent;
