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

    if (request.status === 200) {
      console.log(response);
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
          <div className="latest_buttons">
            <button
              style={{
                backgroundColor:
                  audioType === 1 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setAudioType(1);
                localStorage.setItem("latest_type", 1);
              }}
            >
              jp
            </button>
            <button
              style={{
                backgroundColor:
                  audioType === 2 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setAudioType(2);
                localStorage.setItem("latest_type", 2);
              }}
            >
              en
            </button>
            <button
              style={{
                backgroundColor:
                  audioType === 3 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setAudioType(3);
                localStorage.setItem("latest_type", 3);
              }}
            >
              ch
            </button>
          </div>
        </div>
      )}
      <div className="latestContainer">
        {latest &&
          latest.map((late, index) => {
            const { id, image, title, episodeNumber, episodeId } = late;
            return (
              <LatestCard
                key={index}
                id={id}
                image={image}
                title={title}
                episodeNumber={episodeNumber}
                episodeId={episodeId}
              />
            );
          })}
      </div>
    </section>
  );
}
