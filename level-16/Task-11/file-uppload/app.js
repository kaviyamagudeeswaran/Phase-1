const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// To serve static files
app.use(express.static("views"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/upload", upload.single("myImage"), (req, res) => {
  if (!req.file) {
    return res.send("Please upload a file");
  }

  res.send(`
    <h2>File Uploaded Successfully!</h2>
    <p>Filename: ${req.file.filename}</p>
    <img src="/uploads/${req.file.filename}" width="300px">
    <br><br>
    <a href="/">Upload Another</a>
  `);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
