const fs = require("fs");
const path = require("path");
const os = require("os");

// Create a temporary directory inside the system temp folder
fs.mkdtemp(path.join(os.tmpdir(), "tempDir-"), (err, tempDir) => {
  if (err) {
    return console.error(`Error creating temp directory: ${err.message}`);
  }

  console.log(`Temporary directory created: ${tempDir}`);

  // Create multiple temporary files inside this directory
  for (let i = 1; i <= 3; i++) {
    const tempFilePath = path.join(tempDir, `tempFile${i}.txt`);
    const fileContent = `This is temporary file ${i}`;

    fs.writeFile(tempFilePath, fileContent, (err) => {
      if (err) {
        return console.error(`Error writing file: ${err.message}`);
      }
      console.log(`File created: ${tempFilePath}`);
    });
  }
});
