import React from "react";
import { TripContainer } from "../components/TripContainer.js";
import { Rating } from "../components/Rating.js";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import "../styles/Trippage.css";

const TripPage = () => {
  return (
    <div className="tripPage">
      <div className="infoTrip">
        <TripContainer />
        <Rating />
      </div>
      <div className="commentsTripPage">
        <NewComment />
      </div>
      <div>
        <Comment />
      </div>
    </div>
  );
}

export default TripPage;