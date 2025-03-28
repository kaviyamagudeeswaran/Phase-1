const fs = require("fs");
const path = require("path");

// Define the directory path (current directory)
const dirPath = __dirname;

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  if (files.length === 0) {
    console.log("The directory is empty.");
    return;
  }

  console.log("Directory contents:");
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`[DIR]  ${file}`);
    } else {
      console.log(`[FILE] ${file}`);
    }
  });
});
