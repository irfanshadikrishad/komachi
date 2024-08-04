import { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";
import { FaChevronDown } from "react-icons/fa";

export default function Disqus({ url, currentEpisode }) {
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);

  useEffect(() => {
    setIsCommentLoaded(false);
  }, [url]);
  return (
    <section
      className="disqus"
      style={{ padding: isCommentLoaded ? "15px" : "5px" }}
    >
      {isCommentLoaded ? (
        <DiscussionEmbed
          shortname="komachi-1"
          config={{
            url: url,
            identifier: currentEpisode,
            title: currentEpisode,
          }}
        />
      ) : (
        <p
          className="comment_loader"
          onClick={() => {
            setIsCommentLoaded(true);
          }}
        >
          Load Comments <span className="icon">{<FaChevronDown />}</span>
        </p>
      )}
    </section>
  );
}
