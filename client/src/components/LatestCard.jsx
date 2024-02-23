import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

export default function LatestCard({
  id,
  image,
  title,
  episodeNumber,
  episodeId,
}) {
  const { defaultPoster } = useAuth();
  return (
    <NavLink
      to={`/streaming/${id}?eps=${episodeId}`}
      className="latestIndividual"
    >
      <img
        className="latestPoster"
        src={image ? image : defaultPoster}
        alt={id}
        draggable="false"
      />
      <p className="latestTitle">{title}</p>
      <p className="latestEpisodeNumber">EP {episodeNumber}</p>
    </NavLink>
  );
}
