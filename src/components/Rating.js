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
            type="button"
            className={clickable ? ind <= (rating || hover) ? "ratingOn" : "ratingOff" : ind <= average ? "ratingOn" : "ratingOff"}
            key={clickable ? ind : average}
            onClick={clickable ? () => handleButtonClick(ind) : null}
            onMouseEnter= {clickable ? () => setHover(ind) : null}
            onMouseLeave={clickable ? () => setHover(rating) : null}
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