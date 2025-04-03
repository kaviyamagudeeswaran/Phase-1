const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const { Command } = require("commander");

const program = new Command();
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // AES block size

// Function to derive a key from password
const getKeyFromPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest();
};

// Encrypt a file
const encryptFile = (filePath, password) => {
  try {
    const key = getKeyFromPassword(password);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const input = fs.createReadStream(filePath);
    const outputFilePath = path.join(
      "encrypted",
      path.basename(filePath) + ".enc"
    );
    const output = fs.createWriteStream(outputFilePath);

    output.write(iv);
    input.pipe(cipher).pipe(output);

    output.on("finish", () =>
      console.log(`✅ File encrypted: ${outputFilePath}`)
    );
  } catch (error) {
    console.error("❌ Encryption error:", error.message);
  }
};

// Decrypt a file
const decryptFile = (filePath, password) => {
  try {
    const key = getKeyFromPassword(password);
    const input = fs.createReadStream(filePath);

    const outputFilePath = path.join(
      "decrypted",
      path.basename(filePath).replace(".enc", "")
    );
    const output = fs.createWriteStream(outputFilePath);

    const iv = Buffer.alloc(IV_LENGTH);
    input.read(iv.length); // Read IV from beginning

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    input.pipe(decipher).pipe(output);

    output.on("finish", () =>
      console.log(`✅ File decrypted: ${outputFilePath}`)
    );
  } catch (error) {
    console.error("❌ Decryption error:", error.message);
  }
};

// CLI Setup
program
  .command("encrypt <file>")
  .description("Encrypt a file")
  .action((file) => {
    const password = readlineSync.question("Enter password: ", {
      hideEchoBack: true,
    });
    encryptFile(file, password);
  });

program
  .command("decrypt <file>")
  .description("Decrypt a file")
  .action((file) => {
    const password = readlineSync.question("Enter password: ", {
      hideEchoBack: true,
    });
    decryptFile(file, password);
  });

program.parse(process.argv);
