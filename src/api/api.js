import { db } from "../firebase-config";
import { v4 as uuid } from "uuid";
import {
  getDocs,
  collection,
  addDoc,
  query,
  getDoc,
  where,
  arrayUnion,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

/* 
Trips storage format
{
    id: string,
    area: string,
    countries: String[],
    comments: String[],
    description: string,
    name: string,
    rating: number
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
  try {
    const trips = await getDocs(tripsReference);
    const filteredTrips = trips.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredTrips; //Få til bedre formatering?
  } catch (error) {
    console.error(error);
  }
};

export const createTrip = async (
  tripName,
  countries,
  area,
  rating,
  description
) => {
  try {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 10);
    const auth = getAuth();
    const userID = auth.currentUser.uid;
    await addDoc(tripsReference, {
      tripName: tripName,
      countries: countries,
      area: area,
      description: description,
      rating: rating,
      comments: [],
      tripID: small_id,
      authorID: userID,
      authorName: auth.currentUser.displayName,
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

export const addComment = async (tripId, newComment) => {
  try {
    const trip = doc(db, "trips", tripId);

    await updateDoc(trip, {
      comments: arrayUnion(newComment),
    });
  } catch (err) {
    console.error(err);
  }
};
