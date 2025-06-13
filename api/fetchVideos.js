import fetch from "node-fetch";

export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channels = [
    "UCi7pY1Pp6L6tJv7jIF4L1QQ", // Bigfoot Vlog
    "UCRh2NURaF4u-DHg9cK1iHXA", // Neuralviz
    "UC6axDmOQwUTUt-H5Ipucy5g", // BLVCKLIGHTAI
  ];

  let videos = [];

  try {
    for (const channelId of channels) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&type=video&order=date&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const vids = data.items.map(item => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
        videos.push(...vids);
      }
    }

    res.status(200).json({ videos });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch videos." });
  }
}
