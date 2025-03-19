require("dotenv").config();
const express = require("express");
const syncEmails = require("./syncEmails");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Gmail IMAP Sync Service is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        syncEmails();
    } catch (error) {
        console.error("Error starting email sync:", error);
    }
});
