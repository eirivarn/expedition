import { getUser } from "../api/api";

const calculateWeights = async (userId) => {
  let weights = {};
  await getUser(userId).then((response) => {
    weights = calculateWeightsHelper(response);
  });

  return weights;
};

const calculateWeightsHelper = (user) => {
  const viewedTripsConcat = [];
  const weights = {};
  const viewedTrips = user[0].viewedTrips;
  viewedTrips.forEach((trip) => {
    const places = trip.vals;
    places.forEach((place) => viewedTripsConcat.push(place));
  });
  viewedTripsConcat.sort();
  viewedTripsConcat.forEach((element) => {
    weights[element] = (weights[element] || 0) + 1;
  });
  return weights;
};

export default calculateWeights;
