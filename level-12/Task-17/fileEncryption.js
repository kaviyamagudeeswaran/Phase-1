const fs = require("fs");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// ✅ Define encryptFile function
function encryptFile(inputFile, outputFile) {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
      console.log("File encrypted successfully:", outputFile);
    });
  } catch (error) {
    console.error("Encryption failed:", error);
  }
}

// ✅ Define decryptFile function
function decryptFile(inputFile, outputFile) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => {
      console.log("File decrypted successfully:", outputFile);
    });
  } catch (error) {
    console.error("Decryption failed:", error);
  }
}

// ✅ Define file paths
const originalFile = "test.txt";
const encryptedFile = "test.enc";
const decryptedFile = "test_dec.txt";

// ✅ Call encrypt function after defining it
fs.writeFileSync(originalFile, "This is a sensitive piece of information.");
encryptFile(originalFile, encryptedFile);

// ✅ Delay decryption to ensure encryption is completed
setTimeout(() => {
  decryptFile(encryptedFile, decryptedFile);

  setTimeout(() => {
    // ✅ Verify if the content matches
    try {
      const originalContent = fs.readFileSync(originalFile, "utf8");
      const decryptedContent = fs.readFileSync(decryptedFile, "utf8");

      if (originalContent === decryptedContent) {
        console.log("Decryption verified: Content matches the original.");
      } else {
        console.log("Decryption failed: Content does not match.");
      }
    } catch (error) {
      console.error("Error verifying decrypted content:", error);
    }
  }, 1000);
}, 1000);
