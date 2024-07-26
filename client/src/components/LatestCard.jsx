import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { slisor } from "../utils/workers.js";

export default function LatestCard({
  id,
  image,
  title,
  currentEpisode,
  isAdult,
}) {
  const { defaultPoster } = useAuth();

  return (
    <NavLink
      to={`/streaming/${id}?eps=${currentEpisode}`}
      className="latestIndividual"
    >
      <img
        className="latestPoster"
        src={image}
        alt={id}
        onError={(e) => {
          // If there is an error getting image, Show default poster
          e.target.src = defaultPoster;
        }}
        draggable="false"
      />
      <p className="latestTitle">{slisor(title, 34)}</p>
      <div className="latest_tags">
        <p className="latest_tag">EP {currentEpisode}</p>
        {isAdult === "true" && <p className="latest_tag latest_adult">18+</p>}
      </div>
    </NavLink>
  );
}
