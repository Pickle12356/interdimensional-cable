export default async function handler(req, res) {
  const API_KEY = "AIzaSyAHMHqvjH6cY3uiib32BlfY6B6ina5Y4vo";
  const channels = [
    "UCi7pY1Pp6L6tJv7jIF4L1QQ", // Bigfoot Vlog
    "UCRh2NURaF4u-DHg9cK1iHXA", // Neuralviz
    "UC6axDmOQwIUTu-H5Ipucy5g"  // BLVCKLIGHTAI
  ];

  const results = [];

  for (const channelId of channels) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const shorts = data.items.filter(video => {
      const title = video.snippet.title.toLowerCase();
      return (
        video.id.videoId &&
        (title.includes("ai") || title.includes("funny") || title.includes("alien") || title.includes("robot") || title.includes("bigfoot"))
      );
    });

    for (const video of shorts) {
      results.push(`https://www.youtube.com/embed/${video.id.videoId}`);
    }
  }

  results.sort(() => Math.random() - 0.5);
  res.status(200).json({ videos: results });
}
