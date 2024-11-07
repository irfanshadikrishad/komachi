import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST() {
  try {
    await database()
    await redis.Connect()

    const cache_Key = "schedule_0"
    const cachedData = await client.get(cache_Key)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return Response.json(
        { schedule: JSON.parse(cachedData) },
        {
          status: 200,
        }
      )
    }

    console.warn("[REDIS] Cache miss")

    const schedule = await Anime.find({
      nextAiringEpisode: {
        $exists: true,
        $ne: null,
      },
    })

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]

    const getWeekday = (timestamp: any) => {
      const date = new Date(timestamp * 1000)
      return weekdays[date.getUTCDay()]
    }

    const groupedSchedule = schedule.reduce(
      (acc, anime) => {
        const { nextAiringEpisode } = anime

        if (nextAiringEpisode && nextAiringEpisode.airingTime) {
          const weekday = getWeekday(nextAiringEpisode.airingTime)

          if (!acc[weekday]) {
            acc[weekday] = []
          }

          acc[weekday].push({
            anilistId: anime.anilistId,
            title: anime.title,
            episode: nextAiringEpisode.episode,
            airingTime: nextAiringEpisode.airingTime,
          })
        }

        return acc
      },
      {} as { [key: string]: any[] }
    )

    Object.keys(groupedSchedule).forEach((day) => {
      groupedSchedule[day].sort((a: any, b: any) => a.airingTime - b.airingTime)
    })

    await client.set(cache_Key, JSON.stringify(groupedSchedule), {
      EX: 21600,
    })

    return Response.json({ schedule: groupedSchedule }, { status: 200 })
  } catch (error) {
    return Response.json({ message: (error as Error).message }, { status: 400 })
  }
}
