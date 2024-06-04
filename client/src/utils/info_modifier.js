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
  const dubId = subId.split("-episode-").slice(0, -1);
  return `${String(dubId)}-dub`;
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

export { convertTimestampToReadable, subToDub, hasRepeatedWords };
