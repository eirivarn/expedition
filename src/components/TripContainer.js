import React from "react";
import "../styles/Trippage.css";
import PropTypes from "prop-types";
import image from "../img/test.jpg";

export function TripContainer({ trip }) {
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

  return (
    <div key={trip.id}>
        <h1 className="title">{trip.tripName}</h1>
        <h3 className="author">{trip.userMail}Ola Nordmann</h3>
        <img className="image" src={image} />
        <textarea className="tripDescription">{trip.description}</textarea>
    </div>
  );
}

TripContainer.propTypes = {
  trip: PropTypes.object,
};
