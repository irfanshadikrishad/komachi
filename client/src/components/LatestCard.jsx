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

  let unicorn_number = String(episodeId).split("-");
  unicorn_number = unicorn_number.pop();
  return (
    <NavLink
      to={`/streaming/${id}?eps=${unicorn_number}`}
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
      <p className="latestEpisodeNumber">EP {unicorn_number}</p>
    </NavLink>
  );
}
