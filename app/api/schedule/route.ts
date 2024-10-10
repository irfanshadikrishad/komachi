import Anime from "@/schema/anime";
import { database } from "@/utils/database";

export async function POST(request: Request) {
  try {
    await database();
    const schedule = await Anime.find({
      nextAiringEpisode: {
        $exists: true,
        $ne: null,
      },
    });

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Function to convert Unix timestamp to weekday
    const getWeekday = (timestamp: any) => {
      const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
      return weekdays[date.getUTCDay()]; // Get the day of the week (0 for Sunday, 6 for Saturday)
    };

    // Group schedule by weekdays
    const groupedSchedule = schedule.reduce((acc, anime) => {
      const { nextAiringEpisode } = anime;

      if (nextAiringEpisode && nextAiringEpisode.airingTime) {
        const weekday = getWeekday(nextAiringEpisode.airingTime);

        if (!acc[weekday]) {
          acc[weekday] = [];
        }

        // Push the anime information to the respective weekday
        acc[weekday].push({
          anilistId: anime.anilistId,
          title: anime.title,
          episode: nextAiringEpisode.episode,
          airingTime: nextAiringEpisode.airingTime,
        });
      }

      return acc;
    }, {} as { [key: string]: any[] });

    // Sort the anime by airingTime within each weekday
    Object.keys(groupedSchedule).forEach((day) => {
      groupedSchedule[day].sort(
        (a: any, b: any) => a.airingTime - b.airingTime
      );
    });

    return Response.json({ schedule: groupedSchedule }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}
