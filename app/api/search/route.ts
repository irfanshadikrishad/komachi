import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await redis.Connect()

    const {
      query,
      format,
      genre,
      year,
      origin,
      season,
      status,
      page = 1,
      perPage = 5,
    } = await request.json()

    const resp = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/search?q=${query}&page=${page}`
    )
    const data = await resp.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: (error as Error).message || error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
