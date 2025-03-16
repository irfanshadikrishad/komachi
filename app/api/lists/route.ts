import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  const { show, page = 1 } = await request.json()
  const lowerCaseShow = show.toLowerCase()
  const hianime = new HiAnime.Scraper()
  try {
    await redis.Connect()
    const cache_Key = `$l1sts_${show}_${page}`
    const cacheResp = await client.get(cache_Key)
    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const data = await hianime.getAZList(lowerCaseShow, page)

    await client.set(cache_Key, JSON.stringify(data), { EX: 43200 })

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
        message: `${(error as Error).message}`,
        values: {
          show: show,
          page: page,
        },
      }),
      {
        status: 500,
      }
    )
  }
}
