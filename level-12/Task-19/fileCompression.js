const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

// Function to compress a file
function compressFile(inputFile, outputFile) {
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);
  writeStream.on("finish", () => {
    console.log(`File compressed successfully: ${outputFile}`);
  });
}

// Function to decompress a file
function decompressFile(inputFile, outputFile) {
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);
  writeStream.on("finish", () => {
    console.log(`File decompressed successfully: ${outputFile}`);
  });
}

// Test the functions
const originalFile = path.join(__dirname, "test.txt");
const compressedFile = path.join(__dirname, "test.txt.gz");
const decompressedFile = path.join(__dirname, "test_decompressed.txt");

// Create a test file if it doesn't exist
fs.writeFileSync(
  originalFile,
  "This is a test file for compression and decompression.",
  "utf8"
);
console.log("Test file created.");

// Compress the file
compressFile(originalFile, compressedFile);

// Wait for compression to complete before decompressing
setTimeout(() => {
  decompressFile(compressedFile, decompressedFile);

  // Verify that the decompressed content matches the original
  setTimeout(() => {
    const originalContent = fs.readFileSync(originalFile, "utf8");
    const decompressedContent = fs.readFileSync(decompressedFile, "utf8");

    if (originalContent === decompressedContent) {
      console.log(
        "Decompressed content matches the original. Verification successful!"
      );
    } else {
      console.error(
        "Verification failed! Decompressed content does not match the original."
      );
    }
  }, 1000);
}, 1000);
