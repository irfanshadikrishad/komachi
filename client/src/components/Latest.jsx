import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import LatestCard from "./LatestCard.jsx";

export default function Latest() {
  const { SERVER, getRuntimeInMilliseconds } = useAuth();
  const [latest, setLatest] = useState(
    JSON.parse(localStorage.getItem("latest"))
  ); // Storing Latest Episodes in LocalStorage
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(localStorage.getItem("latest_type"));

  const getLatest = async () => {
    const startTime = getRuntimeInMilliseconds();
    const request = await fetch(`${SERVER}/api/v1/anime/recent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, type }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setLatest(response);
      setLoading(false);
      localStorage.setItem("latest", JSON.stringify(response));
      const endTime = getRuntimeInMilliseconds();
      const runtime = endTime - startTime;
      console.log(`[latest] ${runtime.toFixed(2)} sec.`);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getLatest();
  }, [type]);
  return (
    <section className="container">
      {!loading && (
        <div className="latest_Header">
          <p className="partitionTitleII">Latest updates</p>
          <div className="latest_buttons">
            <button
              style={{
                backgroundColor: type === 1 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setType(1);
                localStorage.setItem("latest_type", 1);
              }}
            >
              jp
            </button>
            <button
              style={{
                backgroundColor: type === 2 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setType(2);
                localStorage.setItem("latest_type", 2);
              }}
            >
              en
            </button>
            <button
              style={{
                backgroundColor: type === 3 && "var(--background) !important",
              }}
              className="latest_button"
              onClick={() => {
                setType(3);
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
