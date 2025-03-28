const fs = require("fs");

const additionalContent = "\nMore content here.";

// Append to the file (creates the file if it doesn't exist)
fs.appendFile("output.txt", additionalContent, "utf8", (err) => {
  if (err) {
    console.error("Error appending to file:", err.message);
    return;
  }
  console.log("Content appended successfully! Check output.txt");
});
