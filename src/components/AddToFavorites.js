import React from "react";
import "../styles/Trippage.css";
import heartIcon from "../img/heart.png";

export function AddToFavorites() {
  return (
    <div className="addFavoriteShowBox">
      <div className="addFavoriteShowText">Add to favorites</div>
      <div className="addFavoriteShowHeart">
        <img id="heartIcon" src={heartIcon}></img>
      </div>
    </div>
  );
}
