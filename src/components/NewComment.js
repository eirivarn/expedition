import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { addComment } from "../api/api";
import "../styles/Trippage.css";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import commentIcon from '../img/comment_icon.svg';

export function NewComment({ tripId, updatePage }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleNewComment = ({ target }) => {
    setComment(target.value);
  };

  const publishComment = async () => {
    const userID = getAuth().currentUser.uid;
    const date = new Date();
    const commentString =
      userID + "::" + name + "::" + comment + "::" + date + "::" + rating;

    await addComment(tripId, commentString);
    updatePage(commentString);
    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <div>
      {/*<h2 className="commentSymbol">💬</h2> */}
      <img src={commentIcon} className="commentIcon"></img>
      <h2 className="commentHeader"> Comments</h2>
      <div className="addRating">
        <label className="nameRating">RATING</label>
        <Rating
          className="newCommentRating"
          name="newCommentRating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        />
      </div>

      <div className="nameComment">
        <label className="nameText">NAME</label>
        <input
          className="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="comments">
        <label className="commentText">COMMENT</label>
        <textarea
          className="commentInput"
          onChange={handleNewComment}
          value={comment}
        />
      </div>
      <button className="publishButton" onClick={publishComment}>
        Publish Comment
      </button>
    </div>
  );
}

NewComment.propTypes = {
  tripId: PropTypes.string,
  updatePage: PropTypes.func,
};
