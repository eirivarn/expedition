import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { addComment } from "../api/api";
import "../styles/Trippage.css";
import Rating from "./Rating";

export function NewComment({ tripId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState([]);

  const handleNewComment = ({ target }) => {
    setComment(target.value);
  };

  const publishComment = async () => {
    const userID = getAuth().currentUser.uid;
    const commentString = userID + ":" + name + ":" + comment;
    await addComment(tripId, commentString);
    setName("");
    setComment("");
  };

  const onRatingClick = async (innitRating) => {
    setRating([]);
    rating.push(innitRating);
  };

  return (
    <div>
      <h2 className="commentSymbol">💬</h2>
      <h2 className="commentHeader">Kommentarer</h2>
      <Rating onClick={onRatingClick} clickable={true} ratings={[]} />
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
