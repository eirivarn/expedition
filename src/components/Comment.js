import { Rating } from "@mui/material";
import React from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";

/* userId,*/

export function Comment({ name, content, rating, date }) {
  return (
    <div className="commentShowBody">
      <h2 className="commentShowAuthor">{name}</h2>
      <label className="commentShowDateTime">{date}</label>
      <Rating className="commentRating" value={rating} size="medium" readOnly />
      <textarea className="commentShowText">{content}</textarea>
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
};

export default Comment;
