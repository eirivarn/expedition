import React, { useState } from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";

export function Rating({ clickable, ratings }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const average = Math.round(ratings.reduce((a,b) => a + b, 0) / ratings.length);

  const handleButtonClick = (ind) => {
    setRating(ind);
    ind = 0;
  };

  return (
    <div className="tripRating">
      {[...Array(5)].map((circle, ind) => {
        ind += 1;
        return (
          <button
            id="ratingButton"
            className={ind <= (rating || hover) ? "ratingOn" : "ratingOff"}
            key={ind}
            onClick={() => handleButtonClick(ind)}
            onMouseEnter={() => setHover(ind)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="circleGroup">&#11044;</span>
          </button>
        );
      })}
    </div>
  );
}

Rating.propTypes = {
  clickable: PropTypes.bool,
  ratings: PropTypes.array
};

export default Rating;