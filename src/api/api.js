import { db } from "../firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";

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
  const trips = await getDocs(tripsReference).catch((err) =>
    console.error(err)
  );
  // TODO - format trips variable
  return trips;
};

export const createTrip = async (name, countries, rating, description) => {
  // Add the trip data to Firestore
  try {
    await addDoc(tripsReference, {
      name: name,
      countries: countries,
      description: description,
      rating: rating,
    });
  } catch (error) {
    console.error("Error adding trip: ", error);
  }
};

/*
export const addComment = async (newComment) => {};

// Wait to implement
export const updateTrip = async () => {};
*/
