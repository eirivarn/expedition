import React, { useState, useEffect } from 'react';
import "../styles/Trippage.css";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import PropTypes from "prop-types";

export function TripContainer( { name }) {
  const [trip, setTrip] = useState();

  //const tripsCollectionRef = collection(db, "trips");
  useEffect(() => {
    const getTrip = async () => {
      setTrip(doc(db, "trips", name));
    };
    getTrip()
    console.log(name)
    console.log(trip)
  }, []);
  /*
  useEffect(() => {
    const getTrip = async () => {
      const data = await getDocs(tripsCollectionRef);
      const trips = data.docs.map((doc) => ({ ...doc.data(), area: doc.area }));
      setTrip(trips.filter((t => t.area === id).findFirst()));
    };
    getTrip();
    console.log(name)
  }, []); */
  
  return (
    <div>
      <h1 className="title">name</h1>
      <h3 className="author">Ola Nordmann</h3>
      <img className="image" />
      <textarea className="description">trip.description</textarea>
    </div>
  );
}

TripContainer.propTypes = {
  name: PropTypes.string
}