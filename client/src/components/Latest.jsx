import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import LatestCard from "./LatestCard.jsx";
import Loader from "./Loader.jsx";

export default function Latest() {
  const { SERVER } = useAuth();
  const [latest, setLatest] = useState(null);

  const getLatest = async () => {
    const request = await fetch(`${SERVER}/api/v1/anime/recent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1 }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setLatest(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getLatest();
  }, []);
  return (
    <section className="container">
      {latest && (
        <div className="latest_Header">
          <p className="partitionTitleII">Latest updates</p>
        </div>
      )}
      <div className="latestContainer">
        {latest ? (
          latest.map(({ anilistId, poster, title, sub_episodes }, index) => {
            return (
              <LatestCard
                key={index}
                id={anilistId}
                image={poster}
                title={title.english ? title.english : title.romaji}
                currentEpisode={sub_episodes.length}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
