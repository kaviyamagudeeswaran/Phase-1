const fs = require("fs");

// Read the file asynchronously
fs.readFile("sample.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err.message);
    return;
  }
  console.log("Contents of sample.txt:\n", data);
});
