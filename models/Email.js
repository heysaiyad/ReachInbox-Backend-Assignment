const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    sender: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);
