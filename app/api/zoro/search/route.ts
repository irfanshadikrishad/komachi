import { client, redis } from "@/utils/redis"
import { ANIME } from "@consumet/extensions"

export async function POST(request: Request) {
  try {
    const { query, page = 1, perPage = 20 } = await request.json()
    console.log(query)

    const zoro = new ANIME.Zoro()

    const results = await zoro.search(query, page)

    return new Response(JSON.stringify(results), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
