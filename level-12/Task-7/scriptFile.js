const fs = require("fs");
const path = require("path");

// Define directory path
const dirPath = path.join(__dirname, "new_folder");

// Check if directory exists before creating it
if (!fs.existsSync(dirPath)) {
  fs.mkdir(dirPath, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err.message}`);
      return;
    }
    console.log('Directory "new_folder" created successfully.');
  });
} else {
  console.log('Directory "new_folder" already exists.');
}
