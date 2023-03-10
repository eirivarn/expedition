import { Rating } from "@mui/material";
import React from "react";
import "../styles/Trippage.css";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import { doc, FieldValue, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import { useState } from "react";
/* userId,*/

export function Comment({ name, userId, content, rating, date, trip}) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(trip.description);
  const isAuthor =
    auth.currentUser !== null
      ? userId === auth.currentUser.uid
      : false;
  console.log(auth.currentUser);


  const handleUpdateComment = async (id) => {
    if (isAuthor) {
      const document = doc(db, "trips", id);
      await updateDoc(document, {
        description: description,
      });
    }
    handleToggle();
  };

  const handleToggle = () => {
    setEditing((current) => !current);
  };

  const handleDeleteCommentButtonClick = async (id) => {
    if (isAuthor) {
      const commentString = userId + "::" + name + "::" + content + "::" + date + "::" + rating;
      comments: {
        commentString
      }
      const document = doc(db, "trips", id);
      updateDoc: FieldValue.arrayRemove()
    }
  };

  return (
    <div className="commentShowBody">
      <h2 className="commentShowAuthor">{name}</h2>
      <label className="commentShowDateTime">{date}</label>
      <Rating className="commentRating" value={rating} size="medium" readOnly />
      <textarea className="commentShowText"
      value={content}
      onChange={(event) => {
        setDescription(event.target.value);
      }}>
      </textarea>
      
      <button
        className={isAuthor ? "editCommentButton" : "notVisibleEditCommentButton"}
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
        className={isAuthor ? "deleteCommentButton" : "notVisibleDeleteCommentButton"}
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
};

export default Comment;
