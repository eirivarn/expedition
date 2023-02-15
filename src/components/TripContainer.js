import React, { Component } from 'react';
import "../styles/Trippage.css";

export class TripContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1 className="title">Trip Title</h1>
        <h3 className="author">Ola Nordmann</h3>
        <text className="rating">PlaceHolder Vurdering</text>
        <img className="image" />
        <textarea className="description">Lorem Ipsum</textarea>
      </div>
    );
  }
}