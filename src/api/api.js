import { db } from "../firebase-config";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";

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

export const createTrip = async (name, countries, rating, description) => {
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
