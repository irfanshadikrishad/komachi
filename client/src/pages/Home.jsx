import Latest from "../components/Latest";
import TopAiring from "../components/TopAiring";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Konami</title>
        <meta
          name="description"
          content="Your premier destination for anime streaming. Explore a vast library of titles across genres. Enjoy high-quality playback and engage with the anime community. Start streaming now!"
        />
        <meta
          name="keywords"
          content="Anime streaming, Watch anime online, Anime episodes, Japanese animation, Anime series, Anime movies, Otaku entertainment, Subbed anime, Dubbed anime, Anime classics, New anime releases, Anime genres (e.g., action, adventure, romance, fantasy), Anime community, Anime recommendations, Anime reviews"
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Konami - Watch anime online" />
        <meta
          property="og:description"
          content="Anime streaming, Watch anime online, Anime episodes, Japanese animation, Anime series, Anime movies, Otaku entertainment, Subbed anime, Dubbed anime, Anime classics, New anime releases, Anime genres (e.g., action, adventure, romance, fantasy), Anime community, Anime recommendations, Anime reviews"
        />
      </Helmet>
      <TopAiring />
      <Latest />
    </>
  );
}
