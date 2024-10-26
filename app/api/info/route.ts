import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export async function POST(request: Request) {
  try {
    await database()
    const { animeId } = await request.json()
    const info = await Anime.findOne({ anilistId: animeId }).populate({
      path: "recommendations",
      model: "ANIME",
    })
    if (info) {
      return new Response(JSON.stringify(info), { status: 200 })
    } else {
      return new Response(JSON.stringify({ message: "Anime not found" }), {
        status: 404,
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    })
  }
}
