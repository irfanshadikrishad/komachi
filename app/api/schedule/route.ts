import Anime from "@/schema/anime";
import { database } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await database();

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const sevenDaysFromNow = currentTimestamp + 7 * 24 * 60 * 60;

  let allSchedules: any[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const query = `{
      Page(page: ${page}, perPage: 50) {
        pageInfo {
          hasNextPage
        }
        airingSchedules(sort: TIME, notYetAired: true, airingAt_greater: ${currentTimestamp}, airingAt_lesser: ${sevenDaysFromNow}) {
          id
          airingAt
          timeUntilAiring
          episode
          media {
            id
            title {
              romaji
              english
            }
          }
        }
      }
    }`;

    const response = await fetch(`https://graphql.anilist.co`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const pageData = data.data.Page.airingSchedules;
    const pageInfo = data.data.Page.pageInfo;

    allSchedules = [...allSchedules, ...pageData];

    hasNextPage = pageInfo.hasNextPage;
    page += 1;
  }

  const enhancedSchedules = await Promise.all(
    allSchedules.map(async (schedule: any) => {
      const mediaId = schedule.media.id;
      const mediaInfo = await Anime.findOne({ anilistId: String(mediaId) });

      if (mediaInfo) {
        return {
          ...schedule,
          media: mediaInfo,
        };
      }

      return null;
    })
  );

  const validSchedules = enhancedSchedules.filter(Boolean);

  return NextResponse.json(validSchedules, { status: 200 });
}
