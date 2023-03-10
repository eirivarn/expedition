import React, { useEffect, useState } from "react";
import { TripContainer } from "../components/TripContainer.js";
import Rating from "@mui/material/Rating";
import { NewComment } from "../components/NewComment.js";
import { Comment } from "../components/Comment.js";
import { AddToFavorites } from "../components/AddToFavorites.js";
import "../styles/Trippage.css";
import { useLocation } from "react-router";

const TripPage = () => {
  const location = useLocation();
  let { from } = location.state;
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  console.log("from:", from);

  const updatePage = (commentString) => {
    console.log("commentString: ", commentString);
    from.comments.push(commentString);
    console.log("from", from);
  };

  const getAllComments = () => {
    const cmnts = from.comments;
    const newComments = [];
    console.log("cmnts:", cmnts);
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
    const ratings = from.rating;
    const average = Math.round(
      ratings.reduce((a, b) => a + b, 0) / ratings.length
    );

    setAverageRating(average);
  };

  useEffect(() => {
    calculateAverageRating();
    getAllComments();
  }, [from, comments]);

  return (
    <div>
      <div className="infoTrip">
        <TripContainer trip={from} />
        <div className="tripRating">
          <Rating value={averageRating} size="large" readOnly />
        </div>
        <div className="addFavoriteArea">
          <AddToFavorites trip={from} />
        </div>
      </div>
      <div className="commentsTripPage">
        <NewComment tripId={from.id} updatePage={updatePage} />
      </div>
      <div>
        {console.log("comments:", comments)}
        {comments.map((comment) => {
          return (
            <div key={comment.userId}>
              <Comment
                trip = {from}
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
