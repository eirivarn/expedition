import React from "react";
import { NewTripInfo } from "../components/NewTripInfo.js";
import "../styles/NewTripPage.css";

const NewTripPage = () => {
  return (
    <div className="newTripPage">
      <div className="userInputs">
        <NewTripInfo />
      </div>
    </div>
  );
};

export default NewTripPage;
