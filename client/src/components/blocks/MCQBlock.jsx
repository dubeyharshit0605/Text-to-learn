import { useState } from "react";

function MCQBlock({ block }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const correctIndex =
    typeof block.answer === "number"
      ? block.answer
      : block.options?.findIndex((option) => option === block.answer);
  const isCorrect = selectedOption === correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert("Please select an option first.");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-slate-950">
        Quiz: {block.question}
      </h3>

      <div className="space-y-3">
        {block.options?.map((option, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
          >
            <input
              type="radio"
              name={block.question}
              checked={selectedOption === index}
              onChange={() => {
                setSelectedOption(index);
                setIsSubmitted(false);
              }}
            />

            <span className="text-slate-700">{option}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
      >
        Check Answer
      </button>

      {isSubmitted && (
        <div
          className={`mt-4 rounded-lg p-3 ${
            isCorrect
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <p className="font-semibold">
            {isCorrect ? "Correct answer!" : "Incorrect answer. Try again."}
          </p>
          {block.explanation && (
            <p className="mt-1 text-sm leading-6">{block.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MCQBlock;
