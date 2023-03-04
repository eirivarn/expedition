import React, { useEffect, useState } from "react";
import { TripContainer } from "../components/TripContainer.js";
import Rating from "@mui/material/Rating";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import "../styles/Trippage.css";
import { useLocation } from "react-router";

const TripPage = () => {
  const location = useLocation();
  const { from } = location.state;
  const [averageRating, setAverageRating] = useState(0);
  console.log("from:", from);
  console.log("from.id:", from.id);

  const calculateAverageRating = () => {
    let ratings = from.rating;
    const average = Math.round(
      ratings.reduce((a, b) => a + b, 0) / ratings.length
    );

    setAverageRating(average);
  };

  useEffect(() => {
    calculateAverageRating();
  }, []);

  return (
    <div>
      <div className="infoTrip">
        <TripContainer trip={from} />
        <div className="tripRating">
          <Rating value={averageRating} size="large" readOnly />
        </div>
      </div>
      <div className="commentsTripPage">
        <NewComment tripId={from.id} />
      </div>
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default TripPage;
