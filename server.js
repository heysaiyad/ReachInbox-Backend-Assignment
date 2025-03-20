require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const syncEmails = require("./services/syncEmails");
const emailRoutes = require("./routes/emailRoutes"); // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Check environment variables
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Exit the application
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");

        // Start syncing emails only after database connection
        syncEmails();
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

// Default route
app.get("/", (req, res) => {
    res.send("Email Onebox Backend Running!");
});

// API routes
app.use("/api/emails", emailRoutes); // Use email-related routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
