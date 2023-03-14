import React, { useEffect, useState } from "react";
import { TripContainer } from "../components/TripContainer.js";
import Rating from "@mui/material/Rating";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import { AddToFavorites } from "../components/AddToFavorites.js";
import "../styles/Trippage.css";
import { useLocation } from "react-router";
import { addToViewedTrips } from "../api/api.js";

const TripPage = () => {
  const location = useLocation();
  let { from } = location.state;
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  let ratings = from.rating;

  const updatePage = (commentString, newRatings) => {
    from.comments.push(commentString);
    ratings = newRatings;

    const commentArray = commentString.split("::");
    const comment = {
      userId: commentArray[0],
      userName: commentArray[1],
      content: commentArray[2],
      date: commentArray[3],
      rating: parseInt(commentArray[4]),
    };
    comments.push(comment);
    calculateAverageRating();
  };

  const getAllComments = () => {
    const cmnts = from.comments;
    const newComments = [];
    cmnts.forEach((ele) => {
      const commentArray = ele.split("::");
      const comment = {
        userId: commentArray[0],
        userName: commentArray[1],
        content: commentArray[2],
        date: commentArray[3],
        rating: parseInt(commentArray[4]),
      };
      newComments.push(comment);
    });
    setComments(newComments);
  };

  const calculateAverageRating = () => {
    const average = Math.round(
      ratings.reduce((a, b) => a + b, 0) / ratings.length
    );

    setAverageRating(average);
  };

  useEffect(() => {
    const reccValues = {
      id: from.id,
      vals: from.region.concat(from.countries),
    };
    addToViewedTrips(reccValues);
    calculateAverageRating();
    getAllComments();
  }, []);

  return (
    <div>
      <div className="infoTrip">
        <TripContainer
          trip={from}
          calculateAverageRating={calculateAverageRating}
        />
        <div className="averageRating">
          <Rating value={averageRating} size="large" readOnly />
          <p>Average rating based on {from.comments.length + 1} ratings</p>
        </div>
        <div className="addFavoriteArea">
          <AddToFavorites trip={from} />
        </div>
      </div>
      <div className="commentsTripPage">
        <NewComment
          tripId={from.id}
          updatePage={updatePage}
          ratings={from.rating}
        />
      </div>
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.userId}>
              <Comment
                userId={comment.userId}
                name={comment.userName}
                content={comment.content}
                rating={comment.rating}
                date={comment.date}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripPage;
