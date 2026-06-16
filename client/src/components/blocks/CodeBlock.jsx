function CodeBlock({ block }) {
  const code = block.text || block.code || "";

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 px-4 py-2 text-xs uppercase tracking-wide text-slate-400">
        {block.language || "code"}
      </div>

      <pre className="overflow-x-auto p-4 text-sm text-slate-100">
        <code>{code || "No code example available."}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
