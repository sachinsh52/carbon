import { energyQuestions } from "@/utils/questions";
import { useState } from "react";

import trackStore from "@/store/trackStore";

export default function TransportOnboard({setOnboard}) {
  const [currentOrder, setOrder] = useState(0);
  
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState(null);

  const [completeAnswer, setCompleteAnswer] = useState({});

  const { addAnswer } = trackStore();
  const lastOrder = 1;

  const currentQuestion = energyQuestions.filter(
    (el) => el.order === currentOrder
  )[0];

  const questionType = currentQuestion.type;

  const handleNext = () => {
    if (currentOrder === lastOrder) {      
      let completeAns = {...completeAnswer, [currentQuestion.slug]: inputAnswer }
      completeAns.emissions = Math.floor(mcqAnswer.av * completeAns.consumption) + 1

      console.log(completeAns)

      addAnswer(completeAns, "energy");
      setOnboard(false)

      return console.log("Done!");
    }

    // setting up complete answer
    setCompleteAnswer({ ...completeAnswer, [currentQuestion.slug]: mcqAnswer?.value });
    setOrder(currentOrder + 1);


    // changing orders
    
  };

  return (
    currentQuestion && (
      <div>
        <h1 className="text-2xl mb-10">{currentQuestion.title}</h1>
        {/* <p>{currentOrder} {details}</p> */}

        {questionType === "mcq" && (
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map((option, index) => {
              let selected = mcqAnswer?.value === option.value;
              return (
                <div
                  onClick={() => setMcqAnswer(option)}
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
            value={inputAnswer}
            placeholder={`in ${mcqAnswer?.unit}`}
            onChange={(e) => setInputAnswer(Number(e.target.value))}
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
