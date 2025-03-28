const fs = require("fs");
const path = require("path");

// Define the file to watch
const fileToWatch = path.join(__dirname, "watched.txt"); // Change filename as needed

// Check if the file exists before watching
if (!fs.existsSync(fileToWatch)) {
  console.log('File "watched.txt" does not exist. Please create it first.');
  process.exit(1);
}

console.log(`Watching for changes on ${fileToWatch}...`);

fs.watch(fileToWatch, (eventType, filename) => {
  if (filename) {
    console.log(`File ${filename} has been ${eventType}.`);
  } else {
    console.log("A change was detected, but the filename is unknown.");
  }
});
