import Link from "next/link";
import Image from "next/image";
import { slisor } from "@/utils/workers.ts";

export default function LatestCard({
  id,
  image,
  title,
  currentEpisode,
  isAdult,
}) {
  return (
    <Link
      href={`/watch/${id}?eps=${currentEpisode}`}
      className="latestIndividual"
    >
      <Image
        width={460}
        height={690}
        className="latestPoster"
        src={image}
        alt={id}
        onError={(e) => {
          // If there is an error getting image, Show default poster
          e.target.src = "";
        }}
        draggable="false"
      />
      <p className="latestTitle">{slisor(title, 100)}</p>
      <div className="latest_tags">
        <p className="latest_tag">EP {currentEpisode}</p>
        {isAdult === "true" && <p className="latest_tag latest_adult">18+</p>}
      </div>
    </Link>
  );
}
