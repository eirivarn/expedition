import React from "react";
import "../styles/toplist.css";
import image from "../img/test.jpg";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const ToplistComponent = ({ name, handleClick, averageRating }) => {
  return (
    <div id="toplist_component" onClick={handleClick}>
      <div>
        <img className="toplist_image" src={image}></img>
      </div>
      <div>
        <h2 className="reiseNavn">{name}</h2>
        <div className="tripAvgRating">
          <Rating value={averageRating} size="medium" readOnly />
        </div>
      </div>
    </div>
  );
};

ToplistComponent.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  averageRating: PropTypes.number,
};

export default ToplistComponent;
