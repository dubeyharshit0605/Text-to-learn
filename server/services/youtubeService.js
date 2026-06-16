const youtubeCache = new Map();

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const getCachedResult = (query) => {
  const cached = youtubeCache.get(query);

  if (!cached) return null;

  const isExpired = Date.now() - cached.createdAt > CACHE_TTL_MS;

  if (isExpired) {
    youtubeCache.delete(query);
    return null;
  }

  return cached.data;
};

const setCachedResult = (query, data) => {
  youtubeCache.set(query, {
    createdAt: Date.now(),
    data,
  });
};

const searchYouTubeVideos = async (query, maxResults = 1) => {
  if (!query || typeof query !== "string") {
    throw new Error("YouTube search query is required");
  }

  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is missing in server environment");
  }

  const cleanQuery = query.trim().toLowerCase();
  const cachedResult = getCachedResult(cleanQuery);

  if (cachedResult) {
    return cachedResult;
  }

  const safeMaxResults = Math.min(Math.max(Number(maxResults) || 1, 1), 3);

  const params = new URLSearchParams({
    part: "snippet",
    q: cleanQuery,
    maxResults: String(safeMaxResults),
    type: "video",
    videoEmbeddable: "true",
    safeSearch: "moderate",
    key: process.env.YOUTUBE_API_KEY,
  });

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.error?.message || "Failed to fetch videos from YouTube API";
    throw new Error(message);
  }

  const videos = (data.items || [])
    .filter((item) => item?.id?.videoId)
    .map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet?.title || "YouTube Video",
      description: item.snippet?.description || "",
      channelTitle: item.snippet?.channelTitle || "",
      thumbnail: item.snippet?.thumbnails?.medium?.url || "",
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

  setCachedResult(cleanQuery, videos);

  return videos;
};

module.exports = {
  searchYouTubeVideos,
};