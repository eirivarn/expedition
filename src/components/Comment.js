import { Rating } from "@mui/material";
import React from "react";
import "../styles/Trippage.css";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import { doc, arrayRemove, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { useState } from "react";
import {addComment, addRating} from "../api/api";
/* userId,*/

export function Comment({ name, userId, content, rating, date, trip, deleteComment }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(content);
  const [prevText, setPrevText] = useState(userId + "::" + name + "::" + content + "::" + date + "::" + rating);
  const [newRating, setRating] = useState(rating)
  const isAuthor =
    auth.currentUser !== null
      ? userId === auth.currentUser.uid
      : false;
  console.log(auth.currentUser);


  const handleUpdateComment = async (id) => {
    if (isAuthor) {
      handleDeleteCommentButtonClick(id)
      const commentString = userId + "::" + name + "::" + text + "::" + date + "::" + newRating;
      await addComment(id, commentString)
      setPrevText(commentString);
      const newRatings = trip.rating
      newRatings.push(newRating)
      await addRating(id, newRatings)
    }
    handleToggle();
  };

  const handleToggle = () => {
    setEditing((current) => !current);
  };

  const handleDeleteCommentButtonClick = async (id) => {
    if (isAuthor) {
      const newRatings = trip.rating
      const i = newRatings.indexOf(rating)
        if (i !== -1) {
            newRatings.splice(i, 1);
        }
      await addRating(id, newRatings)
      const document = doc(db, "trips", id);
      await updateDoc(document, {
        comments: arrayRemove(prevText)
      });
      deleteComment(prevText);
    }
  };

  return (
    <div className="commentShowBody">
      <h2 className="commentShowAuthor">{name}</h2>
      <label className="commentShowDateTime">{date}</label>
      <Rating className="commentRating" value={newRating} size="medium" readOnly={!editing}
        onChange={(event, newValue) => {
          setRating(newValue);
      }}/>
      <textarea className="commentShowText"
      value={text}
      onChange={(event) => {
        setText(event.target.value);
      }}>
      </textarea>
      
      <button
        className={isAuthor ? "editTripButton" : "notVisibleEditButton"}
        disabled={!isAuthor}
        onClick={
          editing
            ? () => {
                handleUpdateComment(trip.id);
              }
            : () => handleToggle()
        }
      >
        {editing ? "Finished" : "Edit"}
      </button>
      <button
        className={isAuthor ? "deleteTripButton" : "notVisibleDeleteButton"}
        disabled={!isAuthor}
        onClick={() => {
          handleDeleteCommentButtonClick(trip.id);
        }}
      >
        &#9746; Delete
      </button>
      
      <div className="commentLinebrake"></div>
    </div>
  );
}

Comment.propTypes = {
  userId: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  rating: PropTypes.number,
  date: PropTypes.string,
  trip: PropTypes.object,
  deleteComment: PropTypes.func,
};

export default Comment;
