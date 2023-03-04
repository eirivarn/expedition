import { getAuth } from "firebase/auth";
import React, { useState, useRef } from "react";
import { addComment } from "../api/api";
import "../styles/Trippage.css";
import Rating from "@mui/material/Rating";

export function NewComment({ tripId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleNewComment = ({ target }) => {
    setComment(target.value);
  };

  const publishComment = async () => {
    const userID = getAuth().currentUser.uid;
    const commentString = userID + ":" + name + ":" + comment + ":" + rating;
    console.log("rating:", rating);
    console.log("commentString:", commentString);
    await addComment(tripId, commentString);
    setName("");
    setComment("");
  };

  const onRatingClick = (rating) => {
    console.log("test");
  };

  return (
    <div>
      <h2 className="commentSymbol">💬</h2>
      <h2 className="commentHeader">Comments</h2>
      <div className="nameComment">
        <label className="nameText">Name: {name}</label>
        <input
          className="nameInput"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="comments">
        <label className="commentText">Comment:</label>
        <textarea className="commentInput" onChange={handleNewComment} />
      </div>
      <button className="publishButton" onClick={publishComment}>
        Publish Comment
      </button>
    </div>
  );
}
