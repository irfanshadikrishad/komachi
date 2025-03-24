import { addWeeks, format, startOfWeek } from "date-fns"

/**
 * Converts timestamp like 1120415 to readable string
 * @param airingTime - in timistamp format as int number
 * @param episode - episode number (eg: 1, 2, 3 etc.)
 * @returns formatted string
 */
function convertTimestampToReadable(airingTime: any, episode: any) {
  let currentDate = new Date()

  let timeUntilAiring = Math.floor(airingTime - currentDate.getTime() / 1000)

  let days = Math.floor(timeUntilAiring / (24 * 3600))
  timeUntilAiring %= 24 * 3600
  let hours = Math.floor(timeUntilAiring / 3600)
  timeUntilAiring %= 3600
  let minutes = Math.floor(timeUntilAiring / 60)
  let seconds = timeUntilAiring % 60

  let output =
    seconds >= 0
      ? `Episode ${episode} will be airing in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`
      : `Episode ${episode} will be airing soon.`

  return output
}

/**
 * Converts SubId to DubId
 * @param subId - (eg: one-piece-episode-1)
 * @returns dubId (eg: one-piece-dub-episode-1)
 */
function subToDub(subId: string) {
  if (!subId) {
    console.log(`subId not provided, ${subId}`)
    return null
  }
  try {
    if (String(subId).includes("dub")) {
      return subId
    } else {
      const dubId = subId.split("-episode-").slice(0, -1)
      return `${String(dubId)}-dub-episode-${episodeIdToEpisodeNumber(subId)}`
    }
  } catch (error) {
    console.log(subId, error)
    return null
  }
}

/**
 * Checks for repeated string (eg: one-piece-episode-episode-1108)
 * @param str
 * @returns true | false
 */
function hasRepeatedWords(str: string) {
  const words = str.split("-")
  const wordSet = new Set()

  for (let word of words) {
    if (wordSet.has(word)) {
      return true
    }
    wordSet.add(word)
  }

  return false
}

/**
 * Converts episodeId to episode number
 * @param episodeId - (eg: one-piece-episode-1108)
 * @returns episode number (eg: 1108)
 */
const episodeIdToEpisodeNumber = (episodeId: string) => {
  const arr = String(episodeId).split("-")
  return arr[arr.length - 1]
}

/**
 * input like 'true' or 'false' will be returned as boolean true/false
 * @param string 'true' | 'false'
 * @returns true | false
 */
const stringToBoolean = (string: any) => {
  if (string === "true" || string === true) {
    return true
  } else {
    return false
  }
}

/**
 * Replace episode number from episodeId
 * @param defaultId (eg: kaijuu-8-gou-episode-1)
 * @param toSetId (eg: 2)
 * @returns (eg: kaijuu-8-gou-episode-2)
 */
const replaceId = (defaultId: string, toSetId: string) => {
  let splt = String(defaultId).split("-")
  splt[splt.length - 1] = toSetId

  return String(splt.join("-"))
}

/**
 * Remove HTML & Markdown from string
 * @param input - string including markdown
 * @returns - pure string
 */
function removeHtmlAndMarkdown(input: string) {
  if (input) {
    input = input.replace(/<\/?[^>]+(>|$)/g, "")
    input = input.replace(/(^|\n)#{1,6}\s+(.+?)(\n|$)/g, "$2 ")
    input = input.replace(/(\*\*|__)(.*?)\1/g, "$2")
    input = input.replace(/(\*|_)(.*?)\1/g, "$2")
    input = input.replace(/`(.+?)`/g, "$1")
    input = input.replace(/\[(.*?)\]\(.*?\)/g, "$1")
    input = input.replace(/!\[(.*?)\]\(.*?\)/g, "$1")
    input = input.replace(/(^|\n)>\s+(.+?)(\n|$)/g, "$2 ")
    input = input.replace(/(^|\n)-\s+(.+?)(\n|$)/g, "$2 ")
    input = input.replace(/(^|\n)\d+\.\s+(.+?)(\n|$)/g, "$2 ")
    input = input.replace(/(^|\n)\s*([-*_]){3,}\s*(\n|$)/g, "$1")
    input = input.replace(/~~(.*?)~~/g, "$1")
    input = input.replace(/\s+/g, " ").trim()
  }
  return input
}

/**
 * Insert value into state
 * @param toInsertString  - String
 * @param arrayToBeInsertedTo - Array
 */
function insert_Into_Array(toInsertString: string, arrayToBeInsertedTo: any) {
  arrayToBeInsertedTo((prevFormat: any) => {
    if (!prevFormat.includes(toInsertString)) {
      return [...prevFormat, toInsertString]
    }
    return prevFormat
  })
}

/**
 * Slice string by length
 * @param str - String to slice
 * @param length - length to slice to
 * @returns sliced string
 */
const slisor = (str: string, length: number) => {
  if (str.length <= length) return str
  let slicePos = length
  while (slicePos > 0 && str[slicePos] !== " ") {
    slicePos--
  }
  if (slicePos === 0) return str.slice(0, length)

  return str.slice(0, slicePos)
}

interface AnimeInfo {
  season: string
  release_date: any
  anilistId: {
    type: string
  }
  malId: { type: string }
  title: {
    english: string
    romaji: string
    native: string
    userPreferred: string
  }
  description: string
  poster: string
  cover: string
  sub_episodes: [{}]
  dub_episodes: [{}]
  origin: string
  format: string
  duration: string
  status: string
  airing_start: {
    year: string
    month: string
    day: string
  }
  airing_end: {
    year: string
    month: string
    day: string
  }
  genres: [string]
  synonyms: [string]
  isAdult: string
  nextAiringEpisode: [
    {
      airingTime: number
      timeUntilAiring: number
      episode: number
    },
  ]
  totalEpisodes: number
  studios: [string]
  recommendations: [
    {
      animeId: string
      malId: string
      title: {
        romaji: string
        english: string
        native: string
        userPreferred: string
      }
      status: string
      episodes: number
      poster: string
      cover: string
      rating: number
      format: string
    },
  ]
  trailer: {
    id: string
  }
}

function streamPreviousEpisode(
  currentEpisode: string,
  episodes: Array<{ episodeId: string }>
): string | null {
  const index = episodes.findIndex((ep) => ep.episodeId === currentEpisode)
  return index > 0 ? episodes[index - 1].episodeId : null
}

function streamNextEpisode(
  currentEpisode: string,
  episodes: Array<{ episodeId: string }>
): string | null {
  const index = episodes.findIndex((ep) => ep.episodeId === currentEpisode)
  return index !== -1 && index + 1 < episodes.length
    ? episodes[index + 1].episodeId
    : null
}

/**
 * Get available title from object
 * @param title - {english?: string; romaji?: string; native?: string; userPreffered?: string;}
 */
function getTitle(title: {
  english?: string
  romaji?: string
  native?: string
  userPreffered?: string
}): string {
  if (title?.english) {
    return title?.english
  } else if (title?.romaji) {
    return title?.romaji
  } else if (title?.native) {
    return title?.native
  } else if (title?.userPreffered) {
    return title?.userPreffered
  } else {
    return "null"
  }
}

/**
 * Extract default source from sources
 * @param source {quality:string, url:string}
 * @returns single source url as string
 */
function extractDefaultSource(
  source: {
    quality: string
    url: string
  }[]
): string | undefined {
  if (source?.length > 0) {
    const preferredQualities = ["default", "1080p", "720p", "480p", "360p"]

    for (const preferred of preferredQualities) {
      const sour = source.find(({ quality }) => quality === preferred)
      if (sour) {
        return sour.url
      }
    }

    return source[0].url
  }
}

function getWeekStart(): number {
  const today = new Date()
  return Math.floor(startOfWeek(today, { weekStartsOn: 1 }).getTime() / 1000)
}

function getWeekEnd(): number {
  const today = new Date()
  const startOfNextWeek = addWeeks(startOfWeek(today, { weekStartsOn: 1 }), 1)
  return Math.floor(startOfNextWeek.getTime() / 1000) - 1
}

interface AnimeSchedule {
  id: number
  airingAt: number
  episode: number
  media: {
    id: number
    title: {
      romaji: string
    }
  }
}

interface ScheduleByDay {
  [key: string]: AnimeSchedule[]
}
const groupScheduleByDay = (schedules: AnimeSchedule[]): ScheduleByDay => {
  const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const grouped: ScheduleByDay = {}
  DAYS_OF_WEEK.forEach((day) => {
    grouped[day] = []
  })
  schedules.forEach((anime) => {
    const day = format(new Date(anime.airingAt * 1000), "EEEE")
    grouped[day].push(anime)
  })
  return grouped
}

function getTimeFromUnixTimestamp(unix_Timestamp: number): String {
  if (unix_Timestamp) {
    const date = new Date(unix_Timestamp * 1000)
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    return String(time)
  } else {
    return "??:??:?? ??"
  }
}

/**
 *
 * @param origin - eg: https://komachi-x0.vercel.app/watch/20
 * @param episode - naruto-episode-1
 * @returns https://komachi-x0.vercel.app/watch/20?eps=1
 */
function originWithEps(origin: string, episode: string): string {
  const url = new URL(origin, window.location.origin)
  if (!url.searchParams.has("eps")) {
    url.searchParams.set("eps", episodeIdToEpisodeNumber(episode))
  } else {
    url.searchParams.delete("eps")
    url.searchParams.set("eps", episodeIdToEpisodeNumber(episode))
  }
  return url.toString()
}

/**
 * Converts episodeId to episode string
 * @param episodeId - eg: naruto-episode-1
 * @returns - Naruto Episode 1
 */
function episodeIdToString(episodeId: string): string {
  return episodeId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
/**
 * Extract episode title with episode number from episodes array
 * @param episode_number - Number of the episode (eg: 1)
 * @param episodes - Array of episodes w/ title and episode number
 * @returns episode title
 */
function extractEpisodeTitle(
  episode_number: number,
  episodes: Array<{
    title: string
    episodeId: string
    number: number
    isFiller: boolean
  }>
): string {
  if (!episode_number) {
    return ``
  }
  const episode = episodes.find((ep) => ep.number === episode_number)
  return episode ? episode.title : `Episode ${episode_number}`
}
/**
 * Gets if the episode is a filler or not
 * @param episode_number - Number of the episode (eg: 1)
 * @param episodes - Array of episodes w/ episode number
 * @returns true or false
 */
function isFillerEpisode(
  episode_number: number,
  episodes: Array<{
    title: string
    episodeId: string
    number: number
    isFiller: boolean
  }>
): boolean {
  const episode = episodes.find((ep) => ep.number === episode_number)
  return episode ? episode.isFiller : false
}

interface EPS_Details {
  anilistID: number
  malID: number
  intro: {
    start: number | null
    end: number | null
  }
  outro: {
    start: number | null
    end: number | null
  }
  headers: {
    Referer: string
  }
  sources: [{ type: string; url: string }]
  tracks: [{ file: string; kind: string; label: string }]
}

function extractSkipTimes(obj: { sub?: EPS_Details; dub?: EPS_Details }) {
  let SUB = null
  let DUB = null
  try {
    if (obj.sub && obj.sub.intro) {
      SUB = { intro: obj.sub.intro, outro: obj.sub.outro }
    }
    if (obj.dub && obj.dub.intro) {
      DUB = { intro: obj.dub.intro, outro: obj.dub.outro }
    }
    return { sub: SUB, dub: DUB }
  } catch (err) {
    console.log((err as Error).message)
    return { sub: SUB, dub: DUB }
  }
}

interface Episode {
  number: number
  episodeId: string
  isFiller: boolean
  title: string
}

function nextEpisodeId(
  currentEpisodeId: string,
  episodes: Episode[]
): string | null {
  const index = episodes.findIndex((ep) => ep.episodeId === currentEpisodeId)
  if (index === -1 || index === episodes.length - 1) return null
  return episodes[index + 1].episodeId
}

function extractBestDownloadLink(sources: { quality: string; url: string }[]) {
  if (sources.length === 0) return null
  if (sources.length === 1) {
    return sources[0].url
  }
  const getResolution = (quality: string) => {
    const match = quality.match(/(\d+)p/)
    return match ? parseInt(match[1]) : 0
  }
  const sortedSources = sources.sort(
    (a, b) => getResolution(b.quality) - getResolution(a.quality)
  )

  return sortedSources[0].url
}

export {
  convertTimestampToReadable,
  episodeIdToEpisodeNumber,
  episodeIdToString,
  extractBestDownloadLink,
  extractDefaultSource,
  extractEpisodeTitle,
  extractSkipTimes,
  getTimeFromUnixTimestamp,
  getTitle,
  getWeekEnd,
  getWeekStart,
  groupScheduleByDay,
  hasRepeatedWords,
  insert_Into_Array,
  isFillerEpisode,
  nextEpisodeId,
  originWithEps,
  removeHtmlAndMarkdown,
  replaceId,
  slisor,
  streamNextEpisode,
  streamPreviousEpisode,
  stringToBoolean,
  subToDub,
}
export type { AnimeInfo }
