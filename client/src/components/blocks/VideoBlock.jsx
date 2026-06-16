import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingSpinner from "../LoadingSpinner";

function VideoBlock({ block }) {
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const query = block.query || block.url || "";
  const cleanQuery = query.trim();
  const youtubeSearchUrl = cleanQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`
    : "";

  useEffect(() => {
    const fetchVideo = async () => {
      if (!cleanQuery) {
        setError("");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setVideo(null);

        const response = await api.get("/youtube", {
          params: {
            query,
            maxResults: 1,
          },
        });

        const firstVideo = response.data?.data?.[0];

        if (!firstVideo) {
          setError("No embedded video was found. Use the search link below.");
          return;
        }

        setVideo(firstVideo);
      } catch (error) {
        console.error(error);
        setError("Video lookup is unavailable. Use the search link below.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [cleanQuery]);

  if (isLoading) {
    return <LoadingSpinner message="Finding a relevant video..." />;
  }

  if (error) {
    if (!youtubeSearchUrl) {
      return null;
    }

    return (
      <div className="my-6 rounded-lg border border-sky-100 bg-sky-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Suggested Video
        </p>
        <h3 className="mt-2 font-bold text-slate-950">{cleanQuery}</h3>
        <p className="mt-1 text-sm text-slate-600">{error}</p>
        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
        >
          Open YouTube Search
        </a>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  if (!video.embedUrl) {
    return (
      <div className="my-6 rounded-lg border border-sky-100 bg-sky-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Suggested Video
        </p>
        <h3 className="mt-2 font-bold text-slate-950">{video.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{video.description}</p>
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
        >
          Open YouTube Search
        </a>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video w-full bg-slate-950">
        <iframe
          className="h-full w-full"
          src={video.embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-950">{video.title}</h3>

        {video.channelTitle && (
          <p className="mt-1 text-sm text-slate-500">
            Channel: {video.channelTitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoBlock;
