import {
  episodeIdToEpisodeNumber,
  episodeIdToString,
  originWithEps,
} from "@/utils/helpers"
import { DiscussionEmbed } from "disqus-react"
import { useEffect, useState } from "react"
import { FaChevronDown } from "react-icons/fa"

export default function Disqus({ url, currentEpisode }) {
  const [isCommentLoaded, setIsCommentLoaded] = useState(false)

  useEffect(() => {
    setIsCommentLoaded(false)
  }, [url])
  return (
    <section
      className="disqus"
      style={{ padding: isCommentLoaded ? "15px" : "5px" }}>
      {isCommentLoaded ? (
        <DiscussionEmbed
          shortname="komachi-2"
          config={{
            url: originWithEps(url, currentEpisode),
            identifier: originWithEps(url, currentEpisode),
            title: episodeIdToString(currentEpisode),
          }}
        />
      ) : (
        <p
          className="comment_loader"
          onClick={() => {
            setIsCommentLoaded(true)
          }}>
          Load Comments <span className="icon">{<FaChevronDown />}</span>
        </p>
      )}
    </section>
  )
}
