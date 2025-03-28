const fs = require("fs");
const path = require("path");

// Specify the file path
const filePath = path.join(__dirname, "example.txt"); // Change to the file you want to check

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error(`Error reading file stats: ${err.message}`);
    return;
  }

  console.log(`File: ${filePath}`);
  console.log(`Size: ${stats.size} bytes`);
  console.log(`Created: ${new Date(stats.birthtime).toLocaleString()}`);
  console.log(`Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
