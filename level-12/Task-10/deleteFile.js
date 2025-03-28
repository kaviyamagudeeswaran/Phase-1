const fs = require("fs");
const path = require("path");

// Define file path
const fileToDelete = path.join(__dirname, "test.txt"); // Change filename as needed

// Check if the file exists before deleting
if (fs.existsSync(fileToDelete)) {
  fs.unlink(fileToDelete, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
      return;
    }
    console.log('File "test.txt" deleted successfully.');
  });
} else {
  console.log('File "test.txt" does not exist.');
}
