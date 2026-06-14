import { useState } from "react";

function PromptForm() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      alert("Please enter a topic first.");
      return;
    }

    console.log("Course topic:", prompt);
    alert(`Frontend setup working. Topic: ${prompt}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: Intro to React Hooks"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        />

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Generate Course
        </button>
      </div>
    </form>
  );
}

export default PromptForm;