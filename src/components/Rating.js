import React, { useState } from "react";
import "../styles/Trippage.css";

export function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rating">
      {[...Array(5)].map((circle, ind) => {
        ind += 1;
        return (
          <button
            type="button"
            className={ind <= (rating || hover) ? "ratingOn" : "ratingOff"}
            key={ind}
            onClick={() => setRating(ind)}
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
