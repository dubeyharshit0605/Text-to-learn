import { useState } from "react";

function MCQBlock({ block }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOption === block.answer;

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
        <p
          className={`mt-4 font-semibold ${
            isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          {isCorrect ? "Correct answer!" : "Incorrect answer. Try again."}
        </p>
      )}
    </div>
  );
}

export default MCQBlock;