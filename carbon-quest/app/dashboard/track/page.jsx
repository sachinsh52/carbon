"use client";

import TransportOnboard from "@/components/onboarding/TransportOnboard";
import EnergyConsumption from "@/components/onboarding/EnergyConsumption";
import trackStore from "@/store/trackStore";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";

import { format } from "date-fns";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";

export default function Track() {
  const {
    trackOptions,
    currentOption,
    changeCurrentOption,
    answers,
    totalEmmissions,
    currentDate,
  } = trackStore();

  const [showOnboard, setShowOnboard] = useState(false);

  async function fetchAnswers() {
    try {
      let user = localStorage.getItem("user");
      user = await JSON.parse(user);

      const {data} = await axiosInstanceWithoutToken({
        url: "/tracks/answers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        params: {
          userId: user._id,
          dateCreated: format(currentDate, "d MMMM yyyy"),
        },
      });

      let totalEmmissions = 0;
      data.answers.forEach((el) => {
        totalEmmissions += el.emissions;
      });
      trackStore.setState({ answers: data.answers, totalEmmissions });
    } catch (err) {
      console.log(err);
      trackStore.setState({ answers: [], totalEmmissions: 0 });
    }
  }

  useEffect(() => {
    fetchAnswers();
  }, []);

  const filteredAnswers = answers.filter((el) => {
    if (currentOption === "Transportation")
      return el.trackOptType === "transport";
    if (currentOption === "Energy Consumption")
      return el.trackOptType === "energy";
  });

  return (
    <div className="container pt-10 mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Track your carbon footprint today
      </h1>

      <div className="flex justify-between mt-10 mb-5">
        <div className="flex flex-col">
          <h2 className="text-2xl">
            Total Emissions:{" "}
            <span className="text-green-500">{totalEmmissions}</span>{" "}
            <span className="text-sm">Co2 eq.</span>
          </h2>
          <p className="text-sm">{format(currentDate, "d MMMM yyyy")}</p>
        </div>
        <div className="flex">
          {trackOptions.map((option, index) => {
            const isActive = currentOption === option;
            const extraStyle = isActive
              ? "bg-green-500/50 text-black"
              : "bg-green-500/20 text-black";
            return (
              <div
                key={index}
                className={"px-5 py-2 text-sm cursor-pointer " + extraStyle}
                onClick={() => changeCurrentOption(option)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-16 mb-16">
        <div className="w-3/4 bg-neutral-200/50 min-h-96 px-10 py-15 rounded-xl pt-10">
          {showOnboard ? (
            <>
              {currentOption === "Transportation" && (
                <TransportOnboard setOnboard={setShowOnboard} />
              )}
              {currentOption === "Energy Consumption" && (
                <EnergyConsumption setOnboard={setShowOnboard} />
              )}
            </>
          ) : (
            <div className="flex flex-wrap gap-10">
              {filteredAnswers.map((answer, i) => {
                return (
                  <div
                    key={`answer-${i}`}
                    className="basis-1/5 bg-green-300/10 rounded-lg min-h-16 min-w-16 p-3"
                  >
                    <div className="flex flex-col items-center gap-2">
                      {Object.keys(answer).map((key, index) => {
                        let title = key.charAt(0).toUpperCase() + key.slice(1);
                        let exclude = ["trackOptType"].includes(key);
                        return (
                          !exclude && (
                            <div className="flex gap-1 justify-between">
                              <h4>{title}: </h4>
                              <p>{answer[key]}</p>
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="basis-1/5 bg-green-300/40 rounded-lg min-h-16 min-w-16 p-3">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-center">Add footprints</h3>

                  <div
                    onClick={() => setShowOnboard(true)}
                    className="w-6 h-6 bg-neutral-100/50 rounded-full flex items-center cursor-pointer"
                  >
                    <AddIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
