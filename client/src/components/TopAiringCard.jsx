import { useAuth } from "../store/auth.jsx";
import { NavLink } from "react-router-dom";
import uniqolor from "uniqolor";

export default function TopAiringCard({ id, title, image, index }) {
  const { color } = uniqolor(image);
  const { defaultPoster } = useAuth();

  return (
    <NavLink to={`/streaming/${id}`} className="topAiringCard">
      <img
        className="topAiringPoster"
        src={image}
        alt={title}
        onError={(e) => {
          e.target.src = defaultPoster;
        }}
      />
      <p className="topAiringTitle">{title}</p>
      <p style={{ color: `${color}` }} className="topRanking">
        TOP {index + 1}
      </p>
    </NavLink>
  );
}
