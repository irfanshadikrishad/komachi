import { META, ANIME } from "@consumet/extensions";

const anilist = new META.Anilist();
const gogoanime = new ANIME.Gogoanime();

test("Trending", async () => {
  const trnd = await anilist.fetchTrendingAnime(1, 5);
  expect(trnd.results).not.toBe([]);
});

test("Popular", async () => {
  const pplr = await anilist.fetchPopularAnime(1, 5);
  expect(pplr.results).not.toBe([]);
});

test("Dub", async () => {
  const dub = await gogoanime.fetchAnimeInfo("one-punch-man-dub");
  expect(dub.episodes).not.toBe({});
});

test("Info", async () => {
  const info = await anilist.fetchAnimeInfo(21);
  expect(info).not.toHaveProperty("error");
});

test("Streaming Episode Link", async () => {
  const streaminLinks = await gogoanime.fetchEpisodeSources(
    "one-piece-episode-1"
  );
  expect(streaminLinks).not.toHaveProperty("error");
});

test("Search", async () => {
  const srch = await anilist.search("tokyo revengers", 1, 5);
  expect(srch).not.toBe([]);
});

test("Streaming Server Sources", async () => {
  const sources = await gogoanime.fetchEpisodeServers("one-piece-episode-1");
  expect(sources).not.toHaveProperty("error");
});

test("Advance Search", async () => {
  const adv_srch = await anilist.advancedSearch("naruto");
  expect(adv_srch).not.toBe([]);
  expect(adv_srch).not.toHaveProperty("error");
});

test("Random Anime", async () => {
  const rndm = await anilist.fetchRandomAnime();
  expect(rndm).not.toHaveProperty("error");
});
