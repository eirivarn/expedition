import React from "react";
import { TripContainer } from "../components/TripContainer.js";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import "../styles/Trippage.css";

const TripPage = () => {
  return (
    <div className="tripPage">
      <div className="infoTrip">
        <TripContainer />
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