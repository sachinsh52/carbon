"use client";
import { useState, useEffect } from "react";
import trackStore from "@/store/trackStore";
import { useRouter } from "next/navigation";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subDays,
  isBefore,
} from "date-fns";

const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";

export default function EventCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trackHistory, setTrackHistory] = useState([]);
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const { changeCurrentDate } = trackStore();
  const router = useRouter();

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  useEffect(() => {
    async function run() {
      try {
        let user = localStorage.getItem("user");
        user = await JSON.parse(user);

        const { data } = await axiosInstanceWithoutToken({
          url: "/tracks/history",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            userId: user._id,
          },
        });

        const arr = data.history.sort((a, b) => a.dateOfTrack - b.dateOfTrack);
        const newArr = [];

        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            newArr.push(arr[i]);
            continue;
          }

          let diff = arr[i].totalEmissions - arr[i - 1].totalEmissions;

          const percentageIn = (diff * 100) / arr[i - 1].totalEmissions;

          console.log(percentageIn);

          arr[i].percentage = percentageIn;

          if (
            arr[i - 1].percentage < 0 &&
            arr[i - 2].percentage < 0 &&
            arr[i].percentage < 0
          ) {
            arr[i].badge = "happy";
          }

          if (arr[i].percentage > 50) {
            arr[i].badge = "sad";
          }

          if (arr[i].percentage > 20 && arr[i].percentage < 50) {
            arr[i].badge = "warm";
          }

          newArr.push(arr[i]);
        }

        setTrackHistory([...newArr]);
      } catch (err) {
        console.log(err);
      }
    }

    run();
  }, []);

  const startingDayIndex = getDay(firstDayOfMonth);

  const handleDateChange = (cmd) => {
    if (cmd === "next") {
      setCurrentDate(addMonths(currentDate, 1));
    }
    if (cmd === "prev") {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const handleNewTrack = (day) => {
    changeCurrentDate(day);
    router.push("/dashboard/track");
  };

  return (
    <div className="w-3/4 border border-neutral-200 rounded-lg min-h-96">
      <div className="py-2 border-b border-neutral-200">
        <div className="flex justify-center gap-5">
          <div
            onClick={() => handleDateChange("prev")}
            className="h-4 w-4 flex justify-center items-center p-3 border border-neutral-500 rounded-full cursor-pointer"
          >
            <ArrowBackIosIcon style={{ fontSize: 12 }} />
          </div>
          <h2 className="text-center font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div
            onClick={() => handleDateChange("next")}
            className="h-4 w-4 flex justify-center rotate-180 items-center p-3 border border-neutral-500 rounded-full cursor-pointer"
          >
            <ArrowBackIosIcon style={{ fontSize: 12 }} />
          </div>
        </div>
      </div>
      <article className="grid grid-cols-7">
        {Weekdays.map((day) => {
          return (
            <div
              key={day}
              className="border border-neutral-100 h-16 flex justify-center items-center"
            >
              <p>{day}</p>
            </div>
          );
        })}

        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border border-neutral-100 h-16 flex justify-center items-center bg-neutral-100/50"
          ></div>
        ))}

        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");

          const dataAv = trackHistory?.find(
            (track) => format(track.dateOfTrack, "yyyy-MM-dd") === dateKey
          );

          return (
            <div
              key={`day-${index}`}
              className="group border border-neutral-100 h-28 select-none"
            >
              <div className="px-2 pt-1">
                <p className="text-sm">{format(day, "d")}</p>
                {dataAv && (
                  <h2 className="text-xl text-neutral-500 font-bold text-right">
                    {dataAv.totalEmissions}
                  </h2>
                )}
                {dataAv?.percentage && (
                  <p
                    className={`text-sm text-right ${
                      dataAv.percentage > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {dataAv.percentage.toFixed(2)}%
                  </p>
                )}
              </div>

              <div className="flex justify-between px-4 pb-2">
                {dataAv?.badge === "sad" && (
                  <img src="/earth-sad.png" className="w-6" />
                )}
                {dataAv?.badge === "warm" && (
                  <img src="/earth-warm.png" className="w-6" />
                )}
                {dataAv?.badge === "happy" && (
                  <img src="/earth-happy.png" className="w-8" />
                )}
                {true && (
                  <button
                    onClick={() => handleNewTrack(day)}
                    className="hidden group-hover:block gradient-btn text-xs p-1 rounded"
                  >
                    Add track
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}
