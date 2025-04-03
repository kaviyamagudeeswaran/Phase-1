const axios = require("axios");
const parser = require("xml2js").parseStringPromise;

const fetchRSSFeed = async (url) => {
  try {
    const response = await axios.get(url);
    const data = await parser(response.data);
    return data.rss.channel[0].item.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description ? item.description[0] : "",
      pubDate: new Date(item.pubDate[0]),
      source: url,
    }));
  } catch (error) {
    console.error(`❌ Error fetching RSS feed from ${url}:`, error);
    return [];
  }
};

module.exports = { fetchRSSFeed };
