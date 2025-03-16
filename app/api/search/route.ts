import { client } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  try {
    if (!client.isOpen) await client.connect()

    const hianime = new HiAnime.Scraper()
    const {
      query,
      format,
      genre,
      season,
      status,
      page = 1,
      sort,
      language,
      rated,
      start_date,
      end_date,
      score,
      origin,
      year,
    } = await request.json()

    const cacheParams = [
      query,
      page,
      genre?.join(","),
      format?.[0],
      sort,
      season?.[0],
      status,
      language,
      rated,
      start_date,
      end_date,
      score,
      origin?.[0],
      year?.[0],
    ]
      .filter(Boolean)
      .join("_")

    const cache_Key = `search0x9_${cacheParams}`
    const cacheResp = await client.get(cache_Key)

    if (cacheResp) {
      return new Response(cacheResp, { status: 200 })
    }

    // Construct `SearchFilters` object
    const queryParams: any = {}

    if (Array.isArray(genre) && genre.length > 0)
      queryParams.genres = genre.join(",").toLowerCase()
    if (Array.isArray(format) && format.length > 0)
      queryParams.type = format[0].toLowerCase()
    if (sort) queryParams.sort = sort
    if (Array.isArray(season) && season.length > 0)
      queryParams.season = season[0].toLowerCase()
    if (Array.isArray(origin) && origin.length > 0)
      queryParams.language = origin[0].toLowerCase()
    if (status) queryParams.status = status
    if (rated) queryParams.rated = rated
    if (Array.isArray(year) && year.length > 0) {
      queryParams.start_date = `${year[0]}-01-01`
      queryParams.end_date = `${year[0]}-12-30`
    }
    if (score) queryParams.score = String(score)

    // Fetch data from HiAnime
    const data = await hianime.search(query, page)

    // Cache the response with expiration time
    await client.set(cache_Key, JSON.stringify(data), { EX: 42600 })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in search API:", error)

    return new Response(
      JSON.stringify({ message: (error as Error).message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
