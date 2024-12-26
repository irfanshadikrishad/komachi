export async function GET(request: Request) {
  try {
    const data = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    const response = await data.json()

    return new Response(JSON.stringify(response.data.spotlightAnimes), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
