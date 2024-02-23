import { useAuth } from "../store/auth.jsx";
import randomColor from "random-color";
import { NavLink } from "react-router-dom";

export default function TopAiringCard({ id, title, image, index }) {
  const rc = randomColor();
  const { defaultPoster } = useAuth();

  return (
    <NavLink to={`/streaming/${id}`} className="topAiringCard">
      <img
        className="topAiringPoster"
        src={image ? image : defaultPoster}
        alt={title}
      />
      <p className="topAiringTitle">{title}</p>
      <p style={{ color: `${rc.hexString()}` }} className="topRanking">
        TOP {index + 1}
      </p>
    </NavLink>
  );
}
