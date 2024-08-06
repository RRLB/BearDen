import s from "./style.module.css";

export function Logo({ image, title, subtitle, miniSubtitle }) {
  return (
    <div>
      <div className={s.container}>
        <img className={s.img} src={image} />
        <span className={s.title}>{title}</span>
      </div>
      <div>
        <span className={s.subtitle}>{subtitle}</span>
      </div>
      <div>
        <span className={s.miniSubtitle}>{miniSubtitle}</span>
      </div>
    </div>
  );
}
