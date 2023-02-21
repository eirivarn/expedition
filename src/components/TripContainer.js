import React, { useState, useEffect } from 'react';
import "../styles/Trippage.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config.js";
import PropTypes from "prop-types";
import image from "../img/test.jpg";

export function TripContainer({ name }) {
  const [trips, setTrips] = useState([]);
  //const docRef = doc(db, "trips", "yXN15Kw1OBZlgr8x1ht0");

  /*
  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  }) */
  const tripsCollectionRef = collection(db, "users")
  useEffect(() => {
    const getTrips = async () => {
      const data = await getDocs(tripsCollectionRef);
      setTrips(data.docs.map((doc) => ({ ...doc.data(), area: doc.area })));
    };
    getTrips();
  }, []);

  return (
    <div>
      {trips.map((trip) => {
        return <div key={trip.area}>
            {" "}
            <h1 className="title">{trip.name}</h1>
            <h3 className="author">Ola Nordmann</h3>
            <img className="image" src={image}/>
            <textarea className="description">{trip.description} + {name}</textarea>
          </div>
      })};
    </div>
  );
}

TripContainer.propTypes = {
  name: PropTypes.string
}