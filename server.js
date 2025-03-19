require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const  syncEmails  = require("./services/syncEmails");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Email Onebox Backend Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    syncEmails(); // Start syncing emails
});
