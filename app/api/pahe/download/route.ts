import { client, redis } from "@/utils/redis"
import { ANIME, META } from "@consumet/extensions"

const pahe = new ANIME.AnimePahe()

export async function POST(request: Request) {
  try {
    const { anilistId, episodeNumber } = await request.json()
    if (!anilistId) {
      return new Response(
        JSON.stringify({
          message: "anilistId not provided!",
          error: "anilistId not provided!",
          episodeId: anilistId,
        }),
        { status: 400 }
      )
    }
    // ---------------------------
    // CHECK IF AVAILABLE IN REDIS
    // ---------------------------
    await redis.Connect()
    const cache_Key = `pahe:download:${anilistId}:${episodeNumber}`
    const cachedResponse = await client.get(cache_Key)
    if (cachedResponse) {
      return new Response(cachedResponse, { status: 200 })
    }

    const meta = new META.Anilist(new ANIME.AnimePahe())
    const info = await meta.fetchAnimeInfo(anilistId)
    if (!info) {
      return new Response(
        JSON.stringify({ message: "Could not fetch info!", anilistId }),
        {
          status: 400,
        }
      )
    }
    const episodes = info?.episodes
    const episode = episodes?.find((ep) => ep.number === episodeNumber)
    if (!episode) {
      return new Response(JSON.stringify({ message: "Episode not found!" }), {
        status: 404,
      })
    }

    const downloads = await pahe.fetchEpisodeSources(episode.id)
    if (!downloads.download) {
      return new Response(
        JSON.stringify({
          message: "Download sources not found!",
          anilistId: anilistId,
          episodeId: episode.id,
          download: downloads,
        }),
        {
          status: 404,
        }
      )
    }

    // ---------------------
    // CACHE TO THE REDIS
    // ---------------------
    await client.set(cache_Key, JSON.stringify(downloads.download), {
      EX: 3600,
    })

    return new Response(JSON.stringify(downloads.download), { status: 200 })
  } catch (error) {
    let msg = `${(error as Error).message}`
    return new Response(
      JSON.stringify({
        message: "Internal Server Error!",
        error: msg,
      }),
      { status: 500 }
    )
  }
}
