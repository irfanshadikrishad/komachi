"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getTimeFromUnixTimestamp,
  getTitle,
  getWeekEnd,
  getWeekStart,
} from "@/utils/helpers";
import styles from "@/styles/schedule.module.css";
import { FaPlay, FaAngleDown, FaAngleUp } from "react-icons/fa6";

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
  const [itemsToShow, setItemsToShow] = useState(15);

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
    // console.log(response);

    if (request.status === 200) {
      setPageInfo(response.pageInfo);
      setSchedule(response.schedule);
    } else {
      // console.log(response);
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
          showSchedule.slice(0, itemsToShow)?.map((d_le, index) => {
            return (
              <div key={index} className={styles.schedule}>
                <div>
                  <p className={styles.schedule_p1}>
                    <span className={styles.time}>
                      {String(getTimeFromUnixTimestamp(d_le?.airingTime))}
                    </span>
                    <span className="one_line">{`${String(
                      getTitle(d_le?.title)
                    )}`}</span>
                  </p>
                </div>
                <Link
                  href={`/watch/${d_le?.anilistId}?eps=${d_le?.episode}`}
                  className={styles.episode_link}
                >
                  <FaPlay /> Episode {d_le?.episode}
                </Link>
              </div>
            );
          })
        ) : (
          <div className={styles.schedule}>
            <p>No schedule for {today ? today : "today"}.</p>
          </div>
        )}
        {showSchedule.length > 15 && (
          <button
            className={styles.showMore}
            onClick={() => {
              if (itemsToShow === 15) {
                setItemsToShow(121);
              } else {
                setItemsToShow(15);
              }
            }}
          >
            Show More {itemsToShow === 15 ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        )}
      </div>
    </section>
  );
}
