import PromptForm from "../components/PromptForm";

function Home() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          AI Course Generator
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Turn any topic into a structured online course
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Enter a topic and generate modules, lessons, quizzes, videos, and
          multilingual explanations.
        </p>

        <PromptForm />
      </div>
    </section>
  );
}

export default Home;