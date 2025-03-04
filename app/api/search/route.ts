import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await redis.Connect()

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
    console.log(
      query,
      format,
      genre,
      season,
      status,
      sort,
      language,
      rated,
      start_date,
      end_date,
      score,
      origin,
      year
    )

    // Construct cache key
    const cache_Key = `search0x_${query}_${page}_${genre}_${format}_${sort}_${season}_${status}_${language}_${rated}_${start_date}_${end_date}_${score}`
    const cacheResp = await client.get(cache_Key)

    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    // Construct query string for advanced search
    const queryParams = new URLSearchParams()
    if (query) queryParams.append("q", query)
    if (page) queryParams.append("page", String(page))
    if (genre.length > 0)
      queryParams.append("genres", String(genre.join(",")).toLowerCase())
    if (format.length > 0)
      queryParams.append("type", String(format[0]).toLowerCase())
    if (sort) queryParams.append("sort", sort)
    if (season.length > 0)
      queryParams.append("season", String(season[0]).toLowerCase())
    if (origin.length > 0)
      queryParams.append("language", String(origin[0]).toLowerCase())
    if (status) queryParams.append("status", status)
    if (rated) queryParams.append("rated", rated)
    if (year.length > 0)
      queryParams.append("start_date", String(year[0]).toLowerCase() + "-01-01")
    if (year.length > 0)
      queryParams.append("end_date", String(year[0]).toLowerCase() + "-12-30")
    if (score) queryParams.append("score", String(score))

    const url = `${process.env.HIANIME}/api/v2/hianime/search?${queryParams.toString()}`

    // Fetch data from the HiAnime API
    const respo = await fetch(url)
    const data = await respo.json()
    if (respo.status !== 200) {
      throw new Error(`Failed to fetch data: ${data.message}`)
    }

    // Cache the response with an expiration
    await client.set(cache_Key, JSON.stringify(data), { EX: 42600 })

    // Return the response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.log(error)

    return new Response(
      JSON.stringify({ message: (error as Error).message || error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
