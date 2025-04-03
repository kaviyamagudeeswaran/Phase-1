import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  humidity: Number,
  weather: String,
  timestamp: { type: Date, default: Date.now },
});

export const Weather = mongoose.model("Weather", weatherSchema);
