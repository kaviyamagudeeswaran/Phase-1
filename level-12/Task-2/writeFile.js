const fs = require("fs");

const content = "Hello, Node.js!";

// Write to a file (overwrites if the file exists)
fs.writeFile("output.txt", content, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err.message);
    return;
  }
  console.log("File written successfully! Check output.txt");
});
