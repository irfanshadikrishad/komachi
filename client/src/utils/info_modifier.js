//@// Converts timestamp like 1120415 to readable string
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

//@// Converts SubId to DubId
//@// Example Input: one-piece-episode-1
//@// Example output: one-piece-dub-episode-1
function subToDub(subId) {
  if (String(subId).includes("dub")) {
    return subId;
  } else {
    const dubId = subId.split("-episode-").slice(0, -1);
    return `${String(dubId)}-dub`;
  }
}

//@// Checks for repeated string
//@// use cases to identify: one-piece-episode-episode-1108
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

//@// Converts episodeId to episode number
//@// exmaple input: one-piece-episode-1108
//@// example output: 1108
const episodeIdToEpisodeNumber = (episodeId) => {
  const arr = String(episodeId).split("-");
  return arr[arr.length - 1];
};

//@// input like 'true' or 'false' will be returned as boolean true/false
const stringToBoolean = (string) => {
  if (string === "true" || string === true) {
    return true;
  } else {
    return false;
  }
};

//@// default id example: kaijuu-8-gou-episode-1
//@// toSetId example: 8
const replaceId = (defaultId, toSetId) => {
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
