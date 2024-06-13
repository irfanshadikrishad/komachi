function convertTimestampToReadable(airingTime, episode) {
  let currentDate = new Date();

  let timeUntilAiring = Math.floor(airingTime - currentDate.getTime() / 1000);

  let days = Math.floor(timeUntilAiring / (24 * 3600));
  timeUntilAiring %= 24 * 3600;
  let hours = Math.floor(timeUntilAiring / 3600);
  timeUntilAiring %= 3600;
  let minutes = Math.floor(timeUntilAiring / 60);
  let seconds = timeUntilAiring % 60;

  let output = `Episode ${episode} will be airing in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;

  return output;
}

function subToDub(subId) {
  if (String(subId).includes("dub")) {
    return subId;
  } else {
    const dubId = subId.split("-episode-").slice(0, -1);
    return `${String(dubId)}-dub`;
  }
}

function hasRepeatedWords(str) {
  const words = str.split("-");
  const wordSet = new Set();

  for (let word of words) {
    if (wordSet.has(word)) {
      return true;
    }
    wordSet.add(word);
  }

  return false;
}

const episodeIdToEpisodeNumber = (episodeId) => {
  const arr = String(episodeId).split("-");
  return arr[arr.length - 1];
};

const stringToBoolean = (string) => {
  if (string === "true" || string === true) {
    return true;
  } else {
    return false;
  }
};

const replaceId = (defaultId, toSetId) => {
  //@// default id example: kaijuu-8-gou-episode-1
  //@// toSetId example: 8
  let splt = String(defaultId).split("-");
  splt[splt.length - 1] = toSetId;

  return String(splt.join("-"));
};

export {
  convertTimestampToReadable,
  subToDub,
  hasRepeatedWords,
  episodeIdToEpisodeNumber,
  stringToBoolean,
  replaceId,
};
