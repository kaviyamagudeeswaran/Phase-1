import fs from "fs";
import path from "path";
import crypto from "crypto";
import archiver from "archiver";

const configPath = path.join(process.cwd(), "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const SOURCE_DIR = path.resolve(config.sourceDir);
const BACKUP_DIR = path.resolve(config.backupDir);
const MAX_BACKUPS = config.maxBackups;
const ENABLE_COMPRESSION = config.enableCompression;
const ENABLE_INCREMENTAL = config.enableIncremental;
const HASH_FILE = path.join(process.cwd(), "hashes.json");

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function log(message) {
  const logMessage = `[${new Date().toLocaleString()}] ${message}\n`;
  fs.appendFileSync("logs.txt", logMessage);
  console.log(message);
}

function calculateFileHash(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function getPreviousHashes() {
  if (fs.existsSync(HASH_FILE)) {
    return JSON.parse(fs.readFileSync(HASH_FILE, "utf-8"));
  }
  return {};
}

function saveHashes(hashes) {
  fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2), "utf-8");
}

function shouldBackupFile(filePath, prevHashes) {
  if (!fs.existsSync(filePath)) return false;
  const newHash = calculateFileHash(filePath);
  return prevHashes[filePath] !== newHash;
}

function createBackupFolder(timestamp) {
  const backupFolder = path.join(BACKUP_DIR, `backup-${timestamp}`);
  fs.mkdirSync(backupFolder, { recursive: true });
  return backupFolder;
}

function copyFiles(src, dest, prevHashes) {
  if (!fs.existsSync(src)) {
    log(`Source directory not found: ${src}`);
    return;
  }

  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyFiles(srcPath, destPath, prevHashes);
    } else {
      if (!ENABLE_INCREMENTAL || shouldBackupFile(srcPath, prevHashes)) {
        fs.copyFileSync(srcPath, destPath);
        prevHashes[srcPath] = calculateFileHash(srcPath);
      }
    }
  }
}

function compressBackup(folderPath) {
  return new Promise((resolve, reject) => {
    const zipPath = `${folderPath}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(zipPath));
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

function cleanupOldBackups() {
  const entries = fs
    .readdirSync(BACKUP_DIR)
    .filter((name) => name.startsWith("backup-") && !name.endsWith(".zip"))
    .map((name) => ({
      name,
      time: fs.statSync(path.join(BACKUP_DIR, name)).mtime.getTime(),
    }))
    .sort((a, b) => a.time - b.time);

  while (entries.length > MAX_BACKUPS) {
    const oldest = entries.shift();
    const folderToDelete = path.join(BACKUP_DIR, oldest.name);
    fs.rmSync(folderToDelete, { recursive: true, force: true });
    log(`Deleted old backup folder: ${folderToDelete}`);

    const zipToDelete = `${folderToDelete}.zip`;
    if (fs.existsSync(zipToDelete)) {
      fs.unlinkSync(zipToDelete);
      log(`Deleted old backup zip: ${zipToDelete}`);
    }
  }
}

async function runBackup() {
  try {
    const timestamp = getTimestamp();
    const backupFolder = createBackupFolder(timestamp);
    const prevHashes = getPreviousHashes();
    copyFiles(SOURCE_DIR, backupFolder, prevHashes);
    saveHashes(prevHashes);
    log(`Backup created: ${backupFolder}`);

    if (ENABLE_COMPRESSION) {
      const zipPath = await compressBackup(backupFolder);
      log(`Backup compressed: ${zipPath}`);
    }

    cleanupOldBackups();
  } catch (error) {
    log(`Backup failed: ${error.message}`);
  }
}

function scheduleBackups(intervalMs = config.backupIntervalMs) {
  setInterval(runBackup, intervalMs);
}

runBackup();
scheduleBackups();
