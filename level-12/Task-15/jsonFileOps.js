const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "data.json");

// Read the JSON file
fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    return console.error(`Error reading JSON file: ${err.message}`);
  }

  try {
    let jsonData = JSON.parse(data);

    // Modify the data: Add a new object
    const newItem = {
      id: jsonData.length + 1,
      name: "New Item",
      value: Math.random().toFixed(2),
    };
    jsonData.push(newItem);

    // Write the modified data back to the file
    fs.writeFile(
      jsonFilePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return console.error(`Error writing JSON file: ${err.message}`);
        }
        console.log("JSON file updated successfully!", newItem);
      }
    );
  } catch (parseError) {
    console.error(`Error parsing JSON data: ${parseError.message}`);
  }
});
