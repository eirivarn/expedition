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
  query,
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
  region,
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
      region: region,
      description: description,
      rating: [rating],
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

// This API-call is used when a user publishes a new comment and adds a new rating
export const addRating = async (tripId, newRating) => {
  try {
    const trip = doc(db, "trips", tripId);

    await updateDoc(trip, {
      rating: newRating,
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


//Henter en liste over landene som er en del av en bestemt tur.
export const getCountriesFromTrip = async (tripID) => {
  // Hent dokumentreferansen til turen
  const tripDocRef = doc(tripsReference, tripID);
  
  // Hent dokumentet fra Firestore
  const tripDoc = await getDoc(tripDocRef);
  
  // Hvis dokumentet finnes, hent dataene og returner landene
  if (tripDoc.exists()) {
    const tripData = tripDoc.data();
    return tripData.countries;
  }
  
  // Hvis dokumentet ikke finnes, returner null
  return null;
};


 //Henter en liste over regionene (eller areas) som er en del av en bestemt tur.
export const getRegionsFromTrip = async (tripID) => {
  // Hent dokumentreferansen til turen
  const tripDocRef = doc(tripsReference, tripID);
  
  // Hent dokumentet fra Firestore
  const tripDoc = await getDoc(tripDocRef);
  
  // Hvis dokumentet finnes, hent dataene og returner regionene (eller areas)
  if (tripDoc.exists()) {
    const tripData = tripDoc.data();
    return tripData.region; //Nye turer har sikker region, gamle har area. 
  }
  
  // Hvis dokumentet ikke finnes, returner null
  return null;
};


//Henter en liste over turer som inkluderer alle oppgitte land og regioner (eller areas).
export const getSortedTripByCountriesAndRegions = async (countries, regions) => {
  try {
    // Hent alle turene fra Firestore
    const trips = await getAllTrips();
    
    // Filtrer turene slik at de kun inkluderer alle oppgitte land og regioner (eller areas)
    const sortedTrips = trips.filter(trip => {
      const containsCountries = countries.every(country => trip.countries.includes(country));
      const containsRegions = regions.every(region => trip.region.includes(region)); // Hvis turer bruker 'area' istedenfor 'region', endrer du denne linjen til: const containsRegions = regions.every(region => trip.area.includes(region));
      return containsCountries && containsRegions;
    });
    
    // Returner den filtrerte listen over turer
    return sortedTrips;
  } catch (err) {
    console.error(err);
  }
};

//Henter en liste over turer og returnerer listen sortert på rating i synkende rekkefølge.
export const getSortedTripsByRating = async (trips) => {
  try {
    // Map over trips og lag et nytt objekt med gjennomsnittlig rating for hver trip
    const tripsWithAvgRating = trips.map((trip) => {
      const avgRating = trip.rating.reduce((acc, curr) => acc + curr, 0) / trip.rating.length;
      return { ...trip, avgRating };
    });

    // Sorter trips basert på gjennomsnittlig rating
    const sortedTrips = tripsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

    return sortedTrips;
  } catch (err) {
    console.error(err);
  }
};

//Søker gjenneom alle turer i databasen og returnerer alle turer som inneholder minst et av søkeordene. Sorteres etter antall søkeord som finnes i trippen. 
export const searchFor = async (searchTerms) => {
  const tripsMap = new Map(); // Opprett et Map-objekt for å lagre turer som matcher søkekriteriene
  const q = query(collection(db, "trips")); // Opprett en spørring for "trips"-samlingen
  const tripSnapshot = await getDocs(q); // Hent alle dokumentene som svarer til spørringen

  const getWordsInTrip = (trip) => { // Hjelpefunksjon som ekstraherer ord fra turen
    const wordsInTrip = [];

    const authorAndDescWords = trip.authorName.split(" ").concat(trip.description.split(" ")); // Legg til forfatternavn og beskrivelse
    wordsInTrip.push(...authorAndDescWords);
   
    const countriesAndRegionsWords = trip.countries.concat(trip.regions); // Legg til land og regioner
    wordsInTrip.push(...countriesAndRegionsWords);
    return wordsInTrip;
  };

  tripSnapshot.forEach((doc) => { // Iterer over alle turene som svarer til spørringen
    const t = doc.data(); // Hent dataene fra dokumentet
    const wordsInTrip = getWordsInTrip(t); // Hent ut alle ordene i turen
    const matchCount = wordsInTrip.filter((word) => searchTerms.includes(word)).length; // Finn antall ord som matcher søkekriteriene
    if (matchCount > 0) { // Hvis det er en eller flere ord som matcher, legg til turen i kartet med antall matchende ord som verdi
      tripsMap.set(t, matchCount);
    }
  });

  const sortedTrips = Array.from(tripsMap) // Konverter tripsMap til et array med [nøkkel, verdi]-par
    .sort((a, b) => b[1] - a[1]) // Sorter arrayet etter antall matchende ord (verdien)
    .map((trip) => trip[0]); // Konverter hvert [nøkkel, verdi]-par til turen (nøkkelen) og lag et nytt array

  return sortedTrips; // Returner arrayet med turer sortert etter antall matchende ord
};


