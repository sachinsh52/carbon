import { transportationQuestions } from "@/utils/questions";
import { useState } from "react";

import trackStore from "@/store/trackStore";

export default function TransportOnboard({setOnboard}) {
  const [currentOrder, setOrder] = useState(0);
  const [currentAnswer, setAnswer] = useState(null);

  const [completeAnswer, setCompleteAnswer] = useState({});
  const [details, setDetails] = useState([]);

  const { addAnswer } = trackStore();

  const lastOrder = 3;

  const currentQuestion = transportationQuestions.filter(
    (el) => el.order === currentOrder
  )[0];

  const questionType = currentQuestion.type;

  const handleNext = () => {
    if (currentOrder === lastOrder - 1) {
      setDetails([...details, Number(currentAnswer)]);
      
      let completeAns = {...completeAnswer, [currentQuestion.slug]: currentAnswer }
      completeAns.emissions = Math.floor(0.59 * completeAns.distance) + 1

      console.log(completeAns)

      addAnswer(completeAns, "transport");
      setOnboard(false)

      return console.log("Done!");
    }

    let firstDetail = details[0] || "";
    firstDetail += currentAnswer.toString();
    setDetails([firstDetail]);

    // setting up complete answer
    setCompleteAnswer({...completeAnswer, [currentQuestion.slug]: currentAnswer?.value })

    // changing orders
    const nextOrder = currentOrder + 1;
    if (nextOrder === lastOrder - 1) return setOrder(nextOrder);

    let special =
      transportationQuestions[nextOrder]?.input?.includes(currentAnswer.code);


    if (special) setOrder(nextOrder);
    else setOrder(nextOrder + 1);
  };

  return (
    currentQuestion && (
      <div>
        <h1 className="text-2xl mb-10">{currentQuestion.title}</h1>
        {/* <p>{currentOrder} {details}</p> */}

        {questionType === "mcq" && (
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map((option, index) => {
              let selected = currentAnswer?.code === option.code;
              return (
                <div
                  onClick={() => setAnswer(option)}
                  key={`option-${index}`}
                  className={`flex bg-neutral-200/50 rounded-lg py-4 px-5 cursor-pointer min-w-48 items-center ${
                    selected && "border-2 border-neutral-700"
                  }`}
                >
                  <p className="ml-3">{option.value}</p>
                </div>
              );
            })}
          </div>
        )}

        {questionType === "input number" && (
          <input
            type="number"
            step={0.01}
            value={currentAnswer}
            placeholder="10km"
            onChange={(e) => setAnswer(Number(e.target.value))}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-5"
          />
        )}

        <div className="flex justify-end mt-5 mb-10">
          <button
            onClick={handleNext}
            className="text-black font-bold gradient-btn px-4 py-2 rounded min-w-24"
          >
            {currentOrder === lastOrder - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    )
  );
}
