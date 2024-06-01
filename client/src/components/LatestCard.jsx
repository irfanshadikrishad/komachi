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
      to={`/streaming/${id}?eps=${episodeNumber}`}
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
      <p className="latestTitle">{title}</p>
      <p className="latestEpisodeNumber">EP {episodeNumber}</p>
    </NavLink>
  );
}
