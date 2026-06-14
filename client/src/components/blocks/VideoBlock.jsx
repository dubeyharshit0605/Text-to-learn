function VideoBlock({ block }) {
  const isUrl =
    typeof block.url === "string" &&
    (block.url.startsWith("http://") || block.url.startsWith("https://"));

  return (
    <div className="my-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-2 font-semibold text-slate-950">Video Resource</p>

      {isUrl ? (
        <a
          href={block.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Watch video
        </a>
      ) : (
        <p className="text-slate-600">
          {block.url || "Video reference will be added here."}
        </p>
      )}
    </div>
  );
}

export default VideoBlock;