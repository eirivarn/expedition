import React from "react";
import "../styles/toplist.css";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { getImage } from "../Data/CountriesByRegion";

const ToplistComponent = ({ name, handleClick, averageRating, region }) => {
  return (
    <div id="toplist_component" onClick={handleClick}>
      <div>
        <img className="toplist_image" src={getImage(region)}></img>
      </div>
      <div id="toplist_name_rating">
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
  region: PropTypes.string,
};

export default ToplistComponent;
