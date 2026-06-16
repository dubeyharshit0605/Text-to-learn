import PromptForm from "../components/PromptForm";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <section className="grid items-center gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-700">
          AI Course Generator
        </p>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Turn any topic into a structured online course
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600">
          Enter a topic and generate modules, lessons, quizzes, videos, and
          multilingual explanations.
        </p>

        <PromptForm />

        <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
          {["Modules", "Quizzes", "PDF export"].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-950">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Generated instantly</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-teal-100 bg-white p-6 shadow-sm">
        <div className="mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-full bg-teal-50">
          <img src={heroImage} alt="" className="h-32 w-32 object-contain" />
        </div>

        <div className="space-y-3">
          {[
            "Foundations and vocabulary",
            "Guided examples and resources",
            "Knowledge checks with explanations",
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-800">
                {index + 1}
              </span>
              <p className="font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
