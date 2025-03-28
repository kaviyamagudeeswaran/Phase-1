const fs = require("fs");
const path = require("path");

function syncDirectories(sourceDir, targetDir) {
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created target directory: ${targetDir}`);
    }

    const sourceFiles = new Set(fs.readdirSync(sourceDir));
    const targetFiles = new Set(fs.readdirSync(targetDir));

    // Copy new or modified files from source to target
    sourceFiles.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      const sourceStat = fs.statSync(sourcePath);

      if (
        !fs.existsSync(targetPath) ||
        fs.statSync(targetPath).mtimeMs < sourceStat.mtimeMs
      ) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied/Updated: ${file}`);
      }
    });

    // Delete files in target that don’t exist in source
    targetFiles.forEach((file) => {
      if (!sourceFiles.has(file)) {
        fs.unlinkSync(path.join(targetDir, file));
        console.log(`Deleted: ${file}`);
      }
    });

    console.log("Directory synchronization complete.");
  } catch (error) {
    console.error("Error synchronizing directories:", error);
  }
}

// Example usage
const sourceDirectory = "sourceDir";
const targetDirectory = "targetDir";

// Ensure test directories exist
if (!fs.existsSync(sourceDirectory))
  fs.mkdirSync(sourceDirectory, { recursive: true });
if (!fs.existsSync(targetDirectory))
  fs.mkdirSync(targetDirectory, { recursive: true });

// Run sync function
syncDirectories(sourceDirectory, targetDirectory);
