import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  //   const rating = 3.75; // for testing
  //declare empty array of stars (empty)
  const starList = [];
  //Stock in a variable the number of filled stars
  const starFillCount = Math.floor(rating);

  //stock in a variable if there is /isnt a half star
  const hasStarHalf = rating - starFillCount >= 0.25;
  //stock in a variable the number of empty stars
  const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);

  //push into the array the number of filled stars
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }

  //push into the array the number of half stars (if there is one or not)
  if (hasStarHalf) {
    starList.push(<StarHalf key={"star-half"} />);
  }

  //push into the array the number of empty stars
  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }

  return <div>{starList}</div>;
}
