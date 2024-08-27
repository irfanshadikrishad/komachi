import { useEffect } from "react";

const Subscribe = ({ channelId }) => {
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://apis.google.com/js/platform.js";
    tag.async = true;
    document.body.appendChild(tag);
  }, []);

  return (
    <div
      className="g-ytsubscribe"
      data-channelid={channelId}
      data-layout="default"
      data-count="default"
    ></div>
  );
};

export default Subscribe;
