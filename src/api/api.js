import { db } from "../firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";

/* 
Trips storage format
{
    id: string,
    userMail: string
    tripName: string,
    countries: String[],
    area: string,
    rating: number[]
    description: string,
    comments: String[],
}
*/

const collectionName = "trips";
const tripsReference = collection(db, collectionName);

export const getAllTrips = async () => {
  try {
    const data = await getDocs(tripsReference);
    const tripsArray = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return tripsArray;
  } catch (err) {
    console.error(err);
  }
};

export const createTrip = async (
  name,
  countries,
  area,
  description,
  rating
) => {
  // Add the trip data to Firestore
  try {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 10);
    const auth = getAuth();
    const userID = auth.currentUser.uid;
    await addDoc(tripsReference, {
      id: id,
      userMail: userMail,
      tripName: tripName,
      countries: countries,
      area: area,
      description: description,
      rating: rating,
      comments: [],
      tripID: small_id,
      userID: userID,
    });
  } catch (err) {
    console.error("Error adding trip: ", err);
  }
};

export const getTripsByUser = async (userMail) => {
  try {
    const q = query(tripsReference, where("userMail", "==", userMail));
    const querySnapshot = await getDocs(q);
    const tripsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tripsArray;
  } catch (err) {
    console.error(err);
  }
};

export const getTripRating = async (tripId) => {
  try {
    const tripReference = collection(db, tripsReference, tripId);
    const tripSnapshot = await getDoc(tripReference);
    if (tripSnapshot.exists()) {
      return tripSnapshot.data();
    } else {
      console.log("No such trip exists.");
    }
  } catch (err) {
    console.error(err);
  }
};
