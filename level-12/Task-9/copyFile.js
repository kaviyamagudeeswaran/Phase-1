const fs = require("fs");
const path = require("path");

// Define file paths
const sourceFile = "source.txt"; // Source file
const destinationFile = "copy.txt"; // Destination file

// Check if destination file already exists
if (fs.existsSync(destinationFile)) {
  console.log("Copy operation aborted: Destination file already exists.");
} else {
  fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
      console.error(`Error copying file: ${err.message}`);
      return;
    }
    console.log(`File copied from source.txt to copy.txt successfully.`);
  });
}
