const fs = require("fs");
const path = require("path");

// Define categories based on file extensions
const categories = {
  Images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  Documents: [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
  ],
  Videos: [".mp4", ".mkv", ".avi", ".mov", ".wmv"],
  Audio: [".mp3", ".wav", ".aac", ".flac"],
  Archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
  Code: [".js", ".html", ".css", ".jsx", ".ts", ".py", ".java", ".c", ".cpp"],
  Others: [],
};

// Function to get category based on file extension
function getCategory(ext) {
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }
  return "Others";
}

// Synchronous file organizer
function organizeFilesSync(directory) {
  if (!fs.existsSync(directory)) {
    console.error("Directory does not exist");
    return;
  }

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.lstatSync(filePath).isFile()) {
      const ext = path.extname(file);
      const category = getCategory(ext);
      const categoryPath = path.join(directory, category);

      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
      }

      fs.renameSync(filePath, path.join(categoryPath, file));
      console.log(`Moved: ${file} -> ${category}/`);
    }
  });
}

// Asynchronous file organizer
async function organizeFilesAsync(directory) {
  if (!fs.existsSync(directory)) {
    console.error("Directory does not exist");
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.lstat(filePath, (err, stats) => {
        if (err || !stats.isFile()) return;

        const ext = path.extname(file);
        const category = getCategory(ext);
        const categoryPath = path.join(directory, category);

        fs.mkdir(categoryPath, { recursive: true }, (err) => {
          if (err) return;

          fs.rename(filePath, path.join(categoryPath, file), (err) => {
            if (err) console.error("Error moving file", err);
            else console.log(`Moved: ${file} -> ${category}/`);
          });
        });
      });
    });
  });
}

// Watch mode to automatically organize new files
function watchDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log("Created missing 'Files' directory.");
  }

  console.log(`Watching for changes in: ${directory}`);

  fs.watch(directory, (eventType, filename) => {
    if (filename && eventType === "rename") {
      const filePath = path.join(directory, filename);
      if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        const ext = path.extname(filename);
        const category = getCategory(ext);
        const categoryPath = path.join(directory, category);

        fs.mkdirSync(categoryPath, { recursive: true });
        fs.renameSync(filePath, path.join(categoryPath, filename));
        console.log(`Auto-moved: ${filename} -> ${category}/`);
      }
    }
  });
}

// Example usage
const directory = path.join(__dirname, "Files");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
  console.log("Created missing 'Files' directory.");
}

// organizeFilesSync(directory);
// organizeFilesAsync(directory);
watchDirectory(directory);
