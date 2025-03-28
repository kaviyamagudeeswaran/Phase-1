const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "data.csv");
const outputFilePath = path.join(__dirname, "results.txt");

// Read the CSV file
fs.readFile(csvFilePath, "utf8", (err, data) => {
  if (err) {
    return console.error(`Error reading CSV file: ${err.message}`);
  }

  try {
    const lines = data.trim().split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(1).map((line) => line.split(","));

    // Process data: Calculate column averages
    let sums = new Array(headers.length).fill(0);
    let counts = new Array(headers.length).fill(0);

    rows.forEach((row) => {
      row.forEach((value, index) => {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          sums[index] += num;
          counts[index]++;
        }
      });
    });

    const averages = sums.map((sum, i) =>
      counts[i] ? (sum / counts[i]).toFixed(2) : "N/A"
    );

    // Prepare output
    const result = `Column Averages:\n${headers
      .map((h, i) => `${h}: ${averages[i]}`)
      .join("\n")}`;

    // Write results to a new file
    fs.writeFile(outputFilePath, result, "utf8", (err) => {
      if (err) {
        return console.error(`Error writing results file: ${err.message}`);
      }
      console.log("CSV processing complete! Results saved to results.txt");
    });
  } catch (parseError) {
    console.error(`Error processing CSV data: ${parseError.message}`);
  }
});
