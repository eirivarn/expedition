import React, { useState } from 'react';
import "../styles/Trippage.css";

export function NewComment() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleNewComment = ({ target }) => {
    setComment(target.value);
    console.log(comment);
  };

  const publishComment = () => {
    console.log("hei");
  }

  return (
    <div>
      <h2 className="commentSymbol">💬</h2>
      <h2 className="commentHeader">Comments</h2>
      <div className="nameComment">
        <label className="nameText">Name: {name}</label>
        <input 
          className="nameInput" 
          onChange={(event) => setName(event.target.value)}/>
      </div>
      <div className="comments">
        <label className="commentText">Comment:</label>
        <textarea 
          className="commentInput" 
          onChange={handleNewComment}/>
      </div>
      <button 
        className="publishButton"
        onClick={publishComment}>
        Publish Comment
      </button>
    </div>
  );
}