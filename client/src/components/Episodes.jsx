import { useAuth } from "../store/auth";
import styles from "../styles/Player.module.css";

export default function Episodes({
  unicornEpisodes,
  getStreamLink,
  animeId,
  malId,
  currentEpisode,
}) {
  const { SKIP_SERVER, setSkipTime } = useAuth();

  const getSkipTime = async (episodeNumber, malId) => {
    const types = ["op", "ed"];
    const url = new URL(
      `${SKIP_SERVER}/v2/skip-times/${malId}/${episodeNumber}`
    );
    url.searchParams.append("episodeLength", 0);
    types.forEach((type) => url.searchParams.append("types", type));

    const request = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    const response = await request.json();
    if (response.statusCode === 200) {
      setSkipTime(response.results);
    } else {
      console.log(response);
    }
  };

  return (
    <div className={styles.streamingV2Buttons}>
      {unicornEpisodes.map(({ id, title, number }, index) => {
        return (
          <button
            onClick={() => {
              getStreamLink(id);
              getSkipTime(number, malId);
              localStorage.setItem(animeId, id);
            }}
            key={index}
            className={styles.streamingV2Button}
            style={{
              backgroundColor: currentEpisode === id && "var(--primary)",
            }}
          >
            {title ? title : number}
          </button>
        );
      })}
    </div>
  );
}
