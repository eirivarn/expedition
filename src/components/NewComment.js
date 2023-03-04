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
      <h2 className="commentHeader">Kommentarer</h2>
      <div className="addRating">
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          size="large"
        />
      </div>
      <div className="nameComment">
        <label className="nameText">Navn: {name}</label>
        <input
          className="nameInput"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="comments">
        <label className="commentText">Kommentar:</label>
        <textarea className="commentInput" onChange={handleNewComment} />
      </div>
      <button className="publishButton" onClick={publishComment}>
        Publiser Kommentar
      </button>
    </div>
  );
}
