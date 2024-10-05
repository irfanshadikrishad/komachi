import { NextResponse } from "next/server";
import { groupScheduleByDay } from "@/utils/helpers";

export async function POST(request: Request) {
  const { page, perPage, notYetAired, weekStart, weekEnd } =
    await request.json();

  try {
    const ALGQL_URI = "https://graphql.anilist.co";
    const query = `
      query ($page: Int, $perPage: Int, $startDate: Int, $endDate: Int, $notYetAired: Boolean) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          airingSchedules(airingAt_greater: $startDate, airingAt_lesser: $endDate, notYetAired: $notYetAired) {
            id
            airingAt
            episode
            media {
              id
              title {
                romaji
                english
                native
              }
            }
          }
        }
      }
    `;

    const variables = {
      page: parseInt(page),
      perPage: parseInt(perPage),
      startDate: parseInt(weekStart),
      endDate: parseInt(weekEnd),
    };

    const request = await fetch(ALGQL_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (request.status !== 200) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const data = await request.json();
    const scheduleByDay = groupScheduleByDay(data.data.Page.airingSchedules);

    return NextResponse.json(
      { schedule: scheduleByDay, pageInfo: data.data.Page.pageInfo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the anime schedule" },
      { status: 500 }
    );
  }
}
