export async function POST(request: Request) {
  try {
    const resp = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    const { data } = await resp.json()

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
