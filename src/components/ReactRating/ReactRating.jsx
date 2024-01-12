import React from "react";
import ReactStars from "react-rating-stars-component";
const ReactRating = ({ starSize, setStarRating, rating }) => {
  const ratingChanged = (newRating) => {
    setStarRating(newRating);
  };
  return (
    <ReactStars
      value={rating ? Number(rating) : 0}
      count={5}
      onChange={ratingChanged}
      size={starSize ? starSize : 24}
      activeColor="#ffd700"
      color="aliceblue"
    />
  );
};

export default ReactRating;
