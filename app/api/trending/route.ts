import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export const POST = async (req: Request) => {
  try {
    await database();
    const { page = 1, perPage = 10 } = await req.json();

    const query = `query ($page: Int, $perPage: Int) {
                    Page(page: $page, perPage: $perPage) {
                      media(type: ANIME, sort: TRENDING_DESC) {
                        id
                        title {
                          romaji
                          english
                          native
                          userPreferred
                        }
                      }
                    }
                  }`;

    const request = await fetch(`https://graphql.anilist.co`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { page, perPage },
      }),
    });

    const { data } = await request.json();

    const anilistIds = data?.Page?.media.map((item: { id: number }) => item.id);

    const results = await Anime.find({ anilistId: { $in: anilistIds } });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
