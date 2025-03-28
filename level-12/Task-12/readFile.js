const fs = require("fs");
const path = require("path");

// Define the directory to read
const rootDir = path.join(__dirname, "test_directory"); // Change as needed

// Recursive function to read directory
function readDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        console.log(`[DIR]  ${fullPath}`);
        readDirectory(fullPath); // Recursively read subdirectory
      } else {
        console.log(`[FILE] ${fullPath}`);
      }
    });
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
}

// Check if the root directory exists
if (fs.existsSync(rootDir)) {
  console.log(`Reading directory: ${rootDir}`);
  readDirectory(rootDir);
} else {
  console.log(`Directory "${rootDir}" does not exist. Please create it first.`);
}
