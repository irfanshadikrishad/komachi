import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import LatestCard from "./LatestCard.jsx";

export default function Latest() {
  const { SERVER, getRuntimeInMilliseconds, setFullPageLoader } = useAuth();
  const [latest, setLatest] = useState(null);
  const [audioType, setAudioType] = useState(
    localStorage.getItem("latest_type")
  );

  const getLatest = async () => {
    const startTime = getRuntimeInMilliseconds();
    const request = await fetch(`${SERVER}/api/v1/anime/recent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, audioType }),
    });
    const response = await request.json();
    // console.log(response);
    if (request.status === 200) {
      setLatest(response);
      setFullPageLoader(false);
      const endTime = getRuntimeInMilliseconds();
      const runtime = endTime - startTime;
      console.log(`[latest] ${runtime.toFixed(2)} sec.`);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getLatest();
  }, [audioType]);
  return (
    <section className="container">
      {latest && (
        <div className="latest_Header">
          <p className="partitionTitleII">Latest updates</p>
        </div>
      )}
      <div className="latestContainer">
        {latest &&
          latest.map(
            ({ id, image, title, episodeNumber, episodeId }, index) => {
              return (
                <LatestCard
                  key={index}
                  id={id}
                  image={image}
                  title={title.english}
                  episodeNumber={episodeNumber}
                  episodeId={episodeId}
                />
              );
            }
          )}
      </div>
    </section>
  );
}
