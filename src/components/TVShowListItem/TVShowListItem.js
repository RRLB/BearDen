import { LIST_ITEM_IMG } from "../../config";
import s from "./style.module.css";

export function TVShowListItem({ tvShow, onClick }) {
  return (
    <div
      /* this on click reporesent setCurrentTRVShow from app.js */
      onClick={() => onClick(tvShow)}
      className={s.container}
    >
      <img
        alt={tvShow.name}
        className={s.image}
        src={
          tvShow.backdrop_path
            ? LIST_ITEM_IMG + tvShow.backdrop_path
            : "https://picsum.photos/200/300"
        }
      />
      <div className={s.title}>{tvShow.name}</div>
    </div>
  );
}
