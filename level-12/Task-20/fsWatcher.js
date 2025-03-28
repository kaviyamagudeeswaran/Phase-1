const fs = require("fs");
const path = require("path");

const monitoredDir = path.join(__dirname, "watched-folder");
const logFile = path.join(__dirname, "fsWatcher.log");

// Ensure the watched directory exists
if (!fs.existsSync(monitoredDir)) {
  fs.mkdirSync(monitoredDir);
  console.log("✅ Monitored directory created.");
}

// Function to log changes
function logChange(eventType, filename) {
  if (!filename) return;

  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${eventType.toUpperCase()}: ${filename}\n`;

  fs.appendFileSync(logFile, logMessage);
  console.log(logMessage.trim());
}

// Watch the directory for changes
try {
  fs.watch(monitoredDir, { recursive: true }, (eventType, filename) => {
    logChange(eventType, filename);
  });

  console.log(`👀 Watching for changes in: ${monitoredDir}`);
} catch (err) {
  console.error("❌ Error initializing watcher:", err);
}
