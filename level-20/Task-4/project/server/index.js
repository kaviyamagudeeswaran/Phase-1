const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHERSTACK_API_KEY = process.env.VITE_WEATHERSTACK_API_KEY;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/weather-dash";

// Create cache for API responses (TTL 15 minutes)
const weatherCache = new NodeCache({ stdTTL: 900 });

// Middleware
app.use(cors());
app.use(express.json());

// API Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// MongoDB Schemas
const userPreferencesSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tempUnit: { type: String, enum: ["C", "F"], default: "C" },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const favoriteLocationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

favoriteLocationSchema.index({ userId: 1, lat: 1, lon: 1 }, { unique: true });

const UserPreferences = mongoose.model(
  "UserPreferences",
  userPreferencesSchema
);
const FavoriteLocation = mongoose.model(
  "FavoriteLocation",
  favoriteLocationSchema
);

// Weather data fetch with mock
const fetchWeatherData = async (queryType, query) => {
  const cacheKey = `${queryType}-${query}`;
  const cachedData = weatherCache.get(cacheKey);
  if (cachedData) return cachedData;

  let data;
  if (queryType === "current") {
    data = {
      location: {
        name: query.includes(",") ? query.split(",")[0] : query,
        country: query.includes(",") ? query.split(",")[1].trim() : "Unknown",
        lat: Math.random() * 90,
        lon: Math.random() * 180,
      },
      current: {
        temperature: Math.round(Math.random() * 30),
        feels_like: Math.round(Math.random() * 30),
        humidity: Math.round(Math.random() * 100),
        pressure: Math.round(980 + Math.random() * 40),
        wind_speed: Math.round(Math.random() * 30),
        wind_direction: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
          Math.floor(Math.random() * 8)
        ],
        weather_code: [800, 801, 500, 501, 300, 200][
          Math.floor(Math.random() * 6)
        ],
        observed_time: new Date().toISOString(),
        sunrise: Math.floor(Date.now() / 1000) - 28800,
        sunset: Math.floor(Date.now() / 1000) + 28800,
      },
    };
  } else if (queryType === "forecast" || queryType === "historical") {
    const isForecast = queryType === "forecast";
    const range = isForecast
      ? [...Array(7).keys()]
      : [...Array(7).keys()].map((i) => -i - 1);
    data = range.map((offset) => {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      return {
        date: date.toISOString().split("T")[0],
        min_temp: Math.round(10 + Math.random() * 10),
        max_temp: Math.round(20 + Math.random() * 10),
        avg_temp: Math.round(15 + Math.random() * 10),
        humidity: Math.round(50 + Math.random() * 50),
        wind_speed: Math.round(5 + Math.random() * 20),
        wind_direction: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
          Math.floor(Math.random() * 8)
        ],
        precipitation: Math.round(Math.random() * 100),
        weather_code: [800, 801, 500, 501, 300, 200][
          Math.floor(Math.random() * 6)
        ],
      };
    });
  }
  weatherCache.set(cacheKey, data);
  return data;
};

// Weather API Routes
app.get("/api/weather/current", async (req, res) => {
  try {
    const { location } = req.query;
    if (!location)
      return res.status(400).json({ error: "Location parameter is required" });
    const weatherData = await fetchWeatherData("current", location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch current weather data" });
  }
});

app.get("/api/weather/current/coords", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon)
      return res.status(400).json({ error: "Latitude and longitude required" });
    const weatherData = await fetchWeatherData("current", `${lat},${lon}`);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather by coordinates" });
  }
});

app.get("/api/weather/forecast", async (req, res) => {
  try {
    const { location } = req.query;
    if (!location)
      return res.status(400).json({ error: "Location parameter is required" });
    const forecastData = await fetchWeatherData("forecast", location);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

app.get("/api/weather/historical", async (req, res) => {
  try {
    const { location } = req.query;
    if (!location)
      return res.status(400).json({ error: "Location parameter is required" });
    const historicalData = await fetchWeatherData("historical", location);
    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

// User Routes (without real authentication)
const USER_ID = "demo-user";

app.get("/api/user/preferences", async (req, res) => {
  try {
    let preferences = await UserPreferences.findOne({ userId: USER_ID });
    if (!preferences)
      preferences = await UserPreferences.create({ userId: USER_ID });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user preferences" });
  }
});

app.put("/api/user/preferences", async (req, res) => {
  try {
    const { tempUnit, theme } = req.body;
    const preferences = await UserPreferences.findOneAndUpdate(
      { userId: USER_ID },
      { tempUnit, theme, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user preferences" });
  }
});

app.get("/api/user/favorites", async (req, res) => {
  try {
    const favorites = await FavoriteLocation.find({ userId: USER_ID });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorite locations" });
  }
});

app.post("/api/user/favorites", async (req, res) => {
  try {
    const { name, country, lat, lon } = req.body;
    const favorite = await FavoriteLocation.create({
      userId: USER_ID,
      name,
      country,
      lat,
      lon,
    });
    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ error: "Location already favorited" });
    res.status(500).json({ error: "Failed to add favorite location" });
  }
});

app.delete("/api/user/favorites", async (req, res) => {
  try {
    const { lat, lon } = req.body;
    await FavoriteLocation.findOneAndDelete({ userId: USER_ID, lat, lon });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete favorite location" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
