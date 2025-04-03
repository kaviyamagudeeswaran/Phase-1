import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Sample Weather Schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);

// 🟢 GET - Fetch all weather data
app.get("/weather", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 🟢 POST - Add new weather data
app.post("/weather", async (req, res) => {
  try {
    const newWeather = new Weather(req.body);
    await newWeather.save();
    res
      .status(201)
      .json({ message: "Weather data saved successfully", data: newWeather });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
