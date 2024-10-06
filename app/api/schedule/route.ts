import { NextResponse } from "next/server";
import { groupScheduleByDay } from "@/utils/helpers";
import { database } from "@/utils/database";
import Anime from "@/schema/anime";

interface RequestBody {
  page: number;
  perPage: number;
  notYetAired?: boolean;
  weekStart: number;
  weekEnd: number;
}

export async function POST(request: Request) {
  try {
    const {
      page,
      perPage,
      notYetAired = false,
      weekStart,
      weekEnd,
    }: RequestBody = await request.json();

    // Validate inputs
    if (!page || !perPage || !weekStart || !weekEnd) {
      return NextResponse.json(
        { error: "Invalid input parameters" },
        { status: 400 }
      );
    }

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
      page: parseInt(page as unknown as string),
      perPage: parseInt(perPage as unknown as string),
      startDate: parseInt(weekStart as unknown as string),
      endDate: parseInt(weekEnd as unknown as string),
      notYetAired: Boolean(notYetAired),
    };

    const response = await fetch(ALGQL_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data?.data?.Page?.airingSchedules) {
      throw new Error("No schedules found in response.");
    }

    await database(); // Ensure DB connection is initialized

    // Extract media IDs from the fetched schedules
    const mediaIds = data.data.Page.airingSchedules.map(
      (schedule: any) => schedule.media.id
    );

    // Query the database for media data based on `anilistId`
    const existingMedia = await Anime.find({
      anilistId: { $in: mediaIds.map(String) }, // Convert to string for querying
    });

    // Create a map for quick access to media data from the database
    const mediaMap = existingMedia.reduce((acc: any, media: any) => {
      acc[media.anilistId] = media;
      return acc;
    }, {});

    const updatedSchedules = data.data.Page.airingSchedules.map(
      (schedule: any) => {
        const mediaFromDB = mediaMap[schedule.media.id];
        if (mediaFromDB) {
          // Replace media field with the one from the database
          schedule.media = mediaFromDB;
        }
        return schedule;
      }
    );

    // Group the updated schedules by day
    const scheduleByDay = groupScheduleByDay(updatedSchedules);

    return NextResponse.json(
      { schedule: scheduleByDay, pageInfo: data.data.Page.pageInfo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error fetching anime schedule.\n${error.message || error}` },
      { status: 500 }
    );
  }
}
