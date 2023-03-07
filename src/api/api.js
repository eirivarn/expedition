import { db, auth } from "../firebase-config";
import { v4 as uuid } from "uuid";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  doc,
} from "firebase/firestore";

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

const tripscollectionName = "trips";
const tripsReference = collection(db, tripscollectionName);

const usersscollectionName = "users";
const usersReference = collection(db, usersscollectionName);

export const getAllUsers = async () => {
  try {
    const data = await getDocs(usersReference);
    const tripsArray = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return tripsArray;
  } catch (err) {
    console.error(err);
  }
};

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

export const getFavoritedTrips = async (user) => {
  try {
    const userRef = doc(usersReference, user.email);
    const userData = await getDoc(userRef);
    const favoritedTrips = userData.data().favoritedTrips;

    const trips = await getDocs(tripsReference);
    const favoritedTripsData = trips.docs
      .filter((doc) => favoritedTrips.includes(doc.id))
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    return favoritedTripsData;
  } catch (err) {
    console.error(err);
  }
};

export const addNewUser = async () => {
  try {
    const userEmail = auth.currentUser.email;
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, userEmail), {
      myTrips: [],
      favoritedTrips: [],
    });
  } catch (err) {
    console.error("Error adding user: ", err);
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
    const userID = auth.currentUser.uid;
    await addDoc(tripsReference, {
      tripName: tripName,
      countries: countries,
      area: area,
      description: description,
      rating: [],
      comments: [],
      tripID: small_id,
      authorID: userID,
      authorName: auth.currentUser.displayName,
      authorRating: rating,
    });
  } catch (err) {
    console.error("Error adding trip: ", err);
  }
};

export const getAllTripsByCurrentUser = async (currentUser) => {
  try {
    if (currentUser && currentUser.uid) {
      const tripsRef = collection(db, "trips");
      const querySnapshot = await getDocs(tripsRef);
      const tripsArray = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((trip) => trip.authorID === currentUser.uid);
      return tripsArray;
    } else {
      console.log("User is not authenticated.");
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getSpecificTrip = async (tripId) => {
  try {
    const tripReference = collection(db, tripsReference, tripId);
    const tripSnapshot = await getDoc(tripReference);
    if (tripSnapshot.exists()) {
      return tripSnapshot.data();
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

export const addRating = async (tripId, newRating) => {
  try {
    const trip = doc(db, "trips", tripId);

    await updateDoc(trip, {
      rating: arrayUnion(newRating),
    });
  } catch (err) {
    console.error(err);
  }
};

// This API-call updates a rating from a user, NOT the author
export const updateRating = async (tripId, oldRating, newRating) => {
  try {
    const trip = doc(db, "trips", tripId);
    const ratings = trip.data.rating;
    let idx = ratings.indexOf(oldRating);
    if (idx != -1) {
      ratings[idx] = newRating;
    }

    await updateDoc(trip, {
      rating: ratings,
    });
  } catch (error) {
    console.error(error);
  }
};
