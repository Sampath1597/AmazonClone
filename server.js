require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your actual MongoDB Atlas URL)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🟢 MongoDB Connected"))
    .catch(err => console.error("🔴 MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
    res.send("Server is Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Server running on port ${PORT}`));