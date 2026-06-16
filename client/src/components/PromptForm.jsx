import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import api, { setAuthToken } from "../utils/api";
import { saveStoredCourse } from "../utils/courseStorage";

function PromptForm() {
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");

      if (isAuthenticated) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "openid profile email",
          },
        });

        setAuthToken(token);
      } else {
        setAuthToken(null);
      }

      const response = await api.post("/courses/generate", {
        prompt: prompt.trim(),
      });

      const payload = response.data?.data || response.data;

      const generatedCourse =
        payload?.course ||
        payload?.generatedCourse ||
        payload;

      const courseId =
        generatedCourse?._id ||
        generatedCourse?.id ||
        payload?.courseId ||
        payload?._id ||
        payload?.id;

      if (!courseId) {
        console.log("Generate response:", response.data);
        throw new Error("The server did not return a generated course id.");
      }

      const normalizedCourse = {
        ...generatedCourse,
        _id: courseId,
        id: courseId,
      };

      saveStoredCourse(normalizedCourse);
      setPrompt("");
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error("Course generation failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not generate the course. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: Intro to React Hooks"
          disabled={isGenerating}
          className="min-h-12 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-700 disabled:bg-slate-100"
        />

        <button
          type="submit"
          disabled={isGenerating}
          className="min-h-12 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isGenerating ? "Generating..." : "Generate Course"}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-left text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}

export default PromptForm;
