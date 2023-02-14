import React from "react";
import "../styles/Trippage.css";

const TripPage = () => {

  return (
    <div className="tripPage">
      <div className="infoTrip">
        <h1 className="title">Trip Title</h1>
        <h3 className="author">Ola Nordmann</h3>
        <text className="rating">PlaceHolder Vurdering</text>
        <img className="image"/>
        <text className="description">Lorem Ipsum</text>
      </div>
      <div className="commentsTripPage">
        <h2 className="commentSymbol">💬</h2>
        <h2 className="commentHeader">Kommentarer </h2>
        <div className="nameComment">
          <label className="nameText">Navn</label>
          <input className="nameInput"></input>
        </div>
        <div className="comments">
          <label className="commentText">Kommentar</label>
          <input className="commentInput"></input>
        </div>
        <button className="publishButton">Publiser Kommentar</button>
      </div>
    </div>
  );
}

export default TripPage;