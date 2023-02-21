import React from "react";
import "..//styles/frontpage.css";
import image from "../img/test.jpg";
//import ReactDOM from 'react-dom';

export class Trips extends React.Component {
  render() {
    return (
      <div className="trips">
        <a href="">
          <img className="tripImage" src={image}></img>
        </a>

        <h2 className="reiseNavn">Reisenavn</h2>
      </div>
    );
  }
}

//ReactDOM.render(<Trips />, document.getElementById('app'));
