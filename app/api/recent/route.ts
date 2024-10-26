import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export const POST = async (req: Request) => {
  try {
    await database()
    const { page = 1, perPage = 24 } = await req.json()

    // Calculate the number of documents to skip
    const skip = (page - 1) * perPage

    const all = await Anime.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const japan = await Anime.find({ origin: "JP" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const china = await Anime.find({ origin: "CN" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const korea = await Anime.find({ origin: "KR" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    return new Response(
      JSON.stringify({
        page,
        perPage,
        all,
        japan,
        china,
        korea,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ message: error || error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
