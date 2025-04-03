const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/contactdb";
let db;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db();
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

// ✅ **1. Add a New Contact (POST)**
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Phone are required" });
    }
    const newContact = {
      name,
      email,
      phone,
      address: address || "Not provided",
    };
    const result = await db.collection("contacts").insertOne(newContact);
    res.status(201).json({
      message: "✅ Contact added successfully",
      contact: { _id: result.insertedId, ...newContact },
    });
  } catch (error) {
    console.error("❌ Error adding contact:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ **2. Get All Contacts (GET)**
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ **3. Get a Single Contact by ID (GET)**
app.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ message: "❌ Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("❌ Error fetching contact:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ **4. Update Contact by ID (PUT)**
app.put("/contacts/:id", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    const result = await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "❌ Contact not found" });
    }

    // ✅ Fetch updated contact and return it
    const updatedContact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json({
      message: "✅ Contact updated successfully",
      updatedContact, // Returns the updated contact details
    });
  } catch (error) {
    console.error("❌ Error updating contact:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ **5. Delete Contact by ID (DELETE)**
app.delete("/contacts/:id", async (req, res) => {
  try {
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "❌ Contact not found" });
    }
    res.json({ message: "✅ Contact deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting contact:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ **Start Server**
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
