import { async } from "@firebase/util";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";

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
    const trips = await getDocs(tripsReference).catch((err) => console.error(err));
    // TODO - format trips variable
    return trips;
}

export const createTrip = async (newTrip) => {
    const docRef = doc(db, collectionName, newTrip.id);
    await setDoc(docRef, newTrip).catch((err) => console.error(err));
}

export const addComment = async (newComment) => {
    
}

// Wait to implement
export const updateTrip = async () => {

}

