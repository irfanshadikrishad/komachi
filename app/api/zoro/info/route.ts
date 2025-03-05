import { ANIME } from "@consumet/extensions"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    const zoro = new ANIME.Zoro()

    const results = await zoro.fetchAnimeInfo(id)

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
