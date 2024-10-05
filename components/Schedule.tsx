"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWeekEnd, getWeekStart } from "@/utils/helpers";
import styles from "@/styles/schedule.module.css";
import { FaPlay } from "react-icons/fa6";

export default function Schedule() {
  const [schedule, setSchedule] = useState<{
    Saturday: [];
    Sunday: [];
    Monday: [];
    Tuesday: [];
    Wednesday: [];
    Thursday: [];
    Friday: [];
  }>({
    Saturday: [],
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });
  const [pageInfo, setPageInfo] = useState({});
  const [currentGMT, setCurrentGMT] = useState("");
  const [today, setToday] = useState("");
  const [showSchedule, setShowSchedule] = useState<any[]>([]);

  const getSchedule = async () => {
    const request = await fetch(`/api/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
        perPage: 150,
        notYetAired: false,
        weekStart: getWeekStart(),
        weekEnd: getWeekEnd(),
      }),
    });
    const response = await request.json();
    console.log(response);

    if (request.status === 200) {
      setPageInfo(response.pageInfo);
      setSchedule(response.schedule);
    } else {
      console.log(response);
    }
  };

  function getCurrentGMT() {
    const currentTime = new Date();
    const gmtOffset = -currentTime.getTimezoneOffset() / 60;
    const gmt = `(GMT${gmtOffset >= 0 ? "+" : ""}${gmtOffset
      .toString()
      .padStart(2, "0")}:00)`;

    const day = currentTime.getDate().toString().padStart(2, "0");
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const year = currentTime.getFullYear();

    const time = currentTime.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setCurrentGMT(`${gmt} ${day}/${month}/${year} ${time}`);
  }

  function getTodaaay() {
    const today = new Date().getDay();

    switch (today) {
      case 0:
        setToday("Sunday");
        setShowSchedule(schedule.Sunday);
        break;
      case 1:
        setToday("Monday");
        setShowSchedule(schedule.Monday);
        break;
      case 2:
        setToday("Tuesday");
        setShowSchedule(schedule.Tuesday);
        break;
      case 3:
        setToday("Wednesday");
        setShowSchedule(schedule.Wednesday);
        break;
      case 4:
        setToday("Thursday");
        setShowSchedule(schedule.Thursday);
        break;
      case 5:
        setToday("Friday");
        setShowSchedule(schedule.Friday);
        break;
      case 6:
        setToday("Saturday");
        setShowSchedule(schedule.Saturday);
        break;
      default:
        setToday("Saturday");
        setShowSchedule(schedule.Saturday);
        break;
    }
  }

  useEffect(() => {
    getSchedule();
  }, []);
  useEffect(() => {
    getTodaaay();
  }, [schedule]);
  useEffect(() => {
    setInterval(() => {
      getCurrentGMT();
    }, 1000);
  }, []);
  return (
    <section className="container">
      <div className={styles.header}>
        <p>Airing Schedule</p>
        <p>{currentGMT}</p>
      </div>
      <div className={styles.days}>
        <div
          onClick={() => {
            setToday("Monday");
            setShowSchedule(schedule.Monday);
          }}
          className={`${styles.day} ${today === "Monday" ? styles.active : ""}`}
        >
          Monday
        </div>
        <div
          onClick={() => {
            setToday("Tuesday");
            setShowSchedule(schedule.Tuesday);
          }}
          className={`${styles.day} ${
            today === "Tuesday" ? styles.active : ""
          }`}
        >
          Tuesday
        </div>
        <div
          onClick={() => {
            setToday("Wednesday");
            setShowSchedule(schedule.Wednesday);
          }}
          className={`${styles.day} ${
            today === "Wednesday" ? styles.active : ""
          }`}
        >
          Wednesday
        </div>
        <div
          onClick={() => {
            setToday("Thursday");
            setShowSchedule(schedule.Thursday);
          }}
          className={`${styles.day} ${
            today === "Thursday" ? styles.active : ""
          }`}
        >
          Thursday
        </div>
        <div
          onClick={() => {
            setToday("Friday");
            setShowSchedule(schedule.Friday);
          }}
          className={`${styles.day} ${today === "Friday" ? styles.active : ""}`}
        >
          Friday
        </div>
        <div
          onClick={() => {
            setToday("Saturday");
            setShowSchedule(schedule.Saturday);
          }}
          className={`${styles.day} ${
            today === "Saturday" ? styles.active : ""
          }`}
        >
          Saturday
        </div>
        <div
          onClick={() => {
            setToday("Sunday");
            setShowSchedule(schedule.Sunday);
          }}
          className={`${styles.day} ${today === "Sunday" ? styles.active : ""}`}
        >
          Sunday
        </div>
      </div>
      <div className={styles.schedules}>
        {showSchedule?.length > 0 ? (
          showSchedule?.map((show, index) => {
            return (
              <div key={index} className={styles.schedule}>
                <p>{show?.media?.title?.romaji}</p>
                <Link
                  href={`/watch/${show?.media?.id}`}
                  className={styles.episode_link}
                >
                  <FaPlay /> Episode {show?.episode}
                </Link>
              </div>
            );
          })
        ) : (
          <div className={styles.schedule}>
            <p>No schedule for today.</p>
          </div>
        )}
      </div>
    </section>
  );
}
