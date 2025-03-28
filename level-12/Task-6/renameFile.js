const fs = require("fs");
const path = require("path");

// Define file paths
const oldPath = path.join(__dirname, "original.txt");
const newPath = path.join(__dirname, "renamed.txt");

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error(`Error renaming file: ${err.message}`);
    return;
  }
  console.log(`File renamed from original.txt to renamed.txt successfully.`);
});
