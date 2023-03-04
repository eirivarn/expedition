import React from "react";
import { TripContainer } from "../components/TripContainer.js";
import { Rating } from "../components/Rating.js";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import { AddToFavorites } from "../components/AddToFavorites.js";
import "../styles/Trippage.css";
import { useLocation } from "react-router";

const TripPage = () => {
  const location = useLocation();
  const { from } = location.state;
  console.log("from:", from);

  return (
    <div>
      <div className="infoTrip">
        <TripContainer trip={from} />
        <Rating className="tripPage" clickable={false} ratings={from.rating} />
      </div>
      <div className="addFavoriteArea">
        <AddToFavorites />
      </div>
      <div className="commentsTripPage">
        <NewComment />
      </div>
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default TripPage;
