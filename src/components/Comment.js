import { Rating } from "@mui/material";
import React from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";

export function Comment({ userId, name, content, rating, date }) {
  return (
    <div className="commentShowBody">
      <h2 className="commentShowAuthor">{name}</h2>
      <Rating value={rating} size="medium" readOnly />
      <label className="commentShowDateTime">{date}</label>
      <textarea className="commentShowText">{content}</textarea>
      <line className="commentShowLine" />
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
