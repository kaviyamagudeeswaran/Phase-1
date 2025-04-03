import cliChart from "cli-chart";
import { Weather } from "../models/weatherModel.js";

export const showTemperatureTrends = async (city, startDate, endDate) => {
  try {
    const data = await Weather.find({
      location: city,
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort("timestamp");

    if (data.length === 0) {
      console.log("No temperature data available for the given period.");
      return;
    }

    const chart = new cliChart({ width: 50, height: 10, horizontal: true });
    data.forEach((entry) => chart.addBar(entry.temperature, "blue"));

    console.log(
      `Temperature trend for ${city} from ${startDate} to ${endDate}:`
    );
    chart.draw();
  } catch (error) {
    console.error("Error displaying temperature trends:", error);
  }
};
