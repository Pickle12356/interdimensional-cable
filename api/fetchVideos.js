import fetch from "node-fetch";

export default async function handler(req, res) {
  const API_KEY = "YOUR_YOUTUBE_API_KEY";
    const channels = [
        "UCi7pY1Pp6L6tJv7jIF4L1QQ", // Bigfoot Vlog
            "UCRh2NURaF4u-DHg9cK1iHXA", // Neuralviz
                "UC6axDmOQwUTUt-H5Ipucy5g"  // BLVCKLIGHTAI
                  ];

                    const results = [];

                      for (const channelId of channels) {
                          const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`;
                              const response = await fetch(url);
                                  const data = await response.json();

                                      if (data.items) {
                                            results.push(...data.items.map(item => item.id.videoId));
                                                }
                                                  }

                                                    res.status(200).json({ videos: results });
                                                    }