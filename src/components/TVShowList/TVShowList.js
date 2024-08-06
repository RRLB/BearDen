import { TVShowListItem } from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css";
// import $ from "jquery";
// import "jquery-ui";

// $(".scrollbar").scrollbar({
//   theme: "dark",
//   scrollButtons: {
//     enable: true,
//   },
// });
export function TVShowList({ tvShowList, onClickItem }) {
  return (
    <div>
      <div className={s.title}>Bear-ly similar, but totally paw-some : </div>
      {/* Fur-get about it, try these instead */}
      <div className={s.list}>
        {tvShowList.map((tvShow) => {
          return (
            <span key={tvShow.id} className={s.tv_show_list_item}>
              <TVShowListItem onClick={onClickItem} tvShow={tvShow} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
