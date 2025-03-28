const fs = require("fs");
const path = require("path");

const sourceFile = path.join(__dirname, "largeFile.txt"); // Source file (at least 1MB)
const destinationFile = path.join(__dirname, "largeFile_copy.txt"); // Destination file

// Get file size for progress tracking
fs.stat(sourceFile, (err, stats) => {
  if (err) {
    return console.error(`Error reading source file: ${err.message}`);
  }

  const totalSize = stats.size;
  let copiedSize = 0;

  // Create read and write streams
  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(destinationFile);

  readStream.on("data", (chunk) => {
    copiedSize += chunk.length;
    const progress = ((copiedSize / totalSize) * 100).toFixed(2);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Copying... ${progress}%`);
  });

  readStream.on("error", (err) => console.error(`Read error: ${err.message}`));
  writeStream.on("error", (err) =>
    console.error(`Write error: ${err.message}`)
  );

  readStream.on("end", () => {
    console.log("\nCopy complete!");
  });

  // Pipe the read stream to the write stream
  readStream.pipe(writeStream);
});
