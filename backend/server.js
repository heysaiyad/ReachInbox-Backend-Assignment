require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const syncEmails = require("./services/syncEmails");
const emailRoutes = require("./routes/emailRoutes"); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); 


if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1); 
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");

        
        syncEmails();
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    });


app.get("/", (req, res) => {
    res.send("Email Onebox Backend Running!");
});


app.use("/api/emails", emailRoutes); 


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
