import Latest from "../components/Latest";
import TopAiring from "../components/TopAiring";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Komachi</title>
      </Helmet>
      <TopAiring />
      <Latest />
    </>
  );
}
