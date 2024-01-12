import { useSelector } from "react-redux";

export const getValue = () => {
  const count = useSelector((state) => state.bookingApp.value);
  return count;
};

export const getBusData = () => {
  const busData = useSelector((state) => state.bookingApp.busData);
  return busData;
};

export const getReviewData = () => {
  const reviewData = useSelector((state) => state.bookingApp.reviewsData);
  return reviewData;
};

export const getBusFilterCategory = () => {
  const filterData = useSelector((state) => state.bookingApp.filterCategory);
  return filterData;
};

export const getBookedSit = () => {
  const bookedSits = useSelector((state) => state.bookingApp.bookedSit);
  return bookedSits;
};

export const showCurrentUser = () => {
  const bookedSits = useSelector((state) => state.bookingApp.currentUser);
  return bookedSits;
};

export const getTotalItem = () => {
  const foodItem = useSelector((state) => state.bookingApp.totalFoodItem);
  return foodItem;
};

export const getBookingData = () => {
  const foodItem = useSelector((state) => state.bookingApp.bookingsData);
  return foodItem;
};

export const getBookedCouch = () => {
  const bookedCouches = useSelector((state) => state.bookingApp.bookedCouch);

  return bookedCouches;
};

export const getLoaderUpdate = () => {
  const loader = useSelector((state) => state.bookingApp.loader);
  return loader;
};
