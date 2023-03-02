import React from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import image from "../img/test.jpg";
import { db, auth } from "../firebase-config.js";
import { useNavigate } from 'react-router-dom';

export function TripContainer({ trip }) {
  const navigate = useNavigate();
  //const [trips, setTrips] = useState([]);
  //const docRef = doc(db, "trips", "yXN15Kw1OBZlgr8x1ht0");

  /*
  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  }) */
  /*   const tripsCollectionRef = collection(db, "users");
  useEffect(() => {
    const getTrips = async () => {
      const data = await getDocs(tripsCollectionRef);
      setTrips(data.docs.map((doc) => ({ ...doc.data(), area: doc.area })));
    };
    getTrips();
  }, []); */

  async function handleDeleteButtonClick() {
    if (trip.userMail === auth.currentUser) {
      await db.collection("trips").doc(trip.id).delete();
    }
    console.log(trip.id);
    navigate("/")
  }

  return (
    <div key={trip.id}>
        <h1 className="title">{trip.tripName}</h1>
        <h3 className="author">{trip.userMail}Ola Nordmann</h3>
        <img className="image" src={image} />
        <textarea className="tripDescription">{trip.description}</textarea>
        <button className="editTripButton">&#9998; Edit</button>
        <button className="deleteTripButton" onClick={handleDeleteButtonClick}>&#9746; Delete</button>

    </div>
  );
}

TripContainer.propTypes = {
  trip: PropTypes.object,
};
