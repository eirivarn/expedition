import React from 'react';
import "../styles/Trippage.css";

export function TripContainer() {
  return (
    <div>
      <h1 className="title">Trip Title</h1>
      <h3 className="author">Ola Nordmann</h3>
      <img className="image" />
      <textarea className="description">Lorem Ipsum</textarea>
    </div>
  );
}