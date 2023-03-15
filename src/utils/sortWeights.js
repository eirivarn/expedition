const sortWeights = (obj) => {
  const sortable = Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) => b - a)
  );
  const sortedPlaces = Object.keys(sortable);
  const topFourSortedPlaces = [];
  sortedPlaces.forEach((ele) => {
    if (topFourSortedPlaces.length < 4) {
      topFourSortedPlaces.push(ele);
    }
  });
  return topFourSortedPlaces;
};

export default sortWeights;
