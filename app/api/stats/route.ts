import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export async function GET(request: Request) {
  try {
    await database()
    const totalAnimes = await Anime.find({})
    const totalOngoing = await Anime.find({ status: "Ongoing" })
    return new Response(
      JSON.stringify({
        total_animes: totalAnimes.length,
        total_ongoing: totalOngoing.length,
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 })
  }
}
