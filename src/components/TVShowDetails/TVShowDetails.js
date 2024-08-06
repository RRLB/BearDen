import { FiveStarRating } from "../FiveStarRating/FiveStarRating";
import s from "./style.module.css";

export function TVShowDetails({ tvShow }) {
  function roundToNearestHalfOrWhole(tvShow) {
    let roundedNumber = 0;
    const averageRating = tvShow.vote_average / 2;
    console.log(averageRating);
    const wholeNumber = Math.floor(averageRating);
    const decimal = averageRating - wholeNumber;

    if (decimal < 0.25) {
      roundedNumber = wholeNumber;
    } else if (decimal < 0.75) {
      roundedNumber = wholeNumber + 0.5;
    } else if (decimal >= 0.75) {
      roundedNumber = wholeNumber + 1;
    }
    return roundedNumber;
  }

  const rating = roundToNearestHalfOrWhole(tvShow);
  console.log(rating);

  return (
    <div className={s.container}>
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.ratingContainer}>
        <FiveStarRating rating={rating} />
        <div className={s.rating}>{rating}</div>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </div>
  );
}
