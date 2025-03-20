const express = require("express");
const { searchEmails } = require("../services/elasticService");
const Email = require("../models/Email");


const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const { query, folder, account } = req.query;

        if (!query || !folder || !account) {
            return res.status(400).json({ error: "Missing required parameters." });
        }

        const result = await searchEmails(query, folder, account);
        res.json(result);
    } catch (error) {
        console.error("Error in search route:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const { label, query } = req.query;
        const filter = {};

        if (label) filter.label = label;
        if (query) {
            filter.$or = [
                { subject: { $regex: query, $options: "i" } },
                { sender: { $regex: query, $options: "i" } },
                { body: { $regex: query, $options: "i" } },
            ];
        }

        const emails = await Email.find(filter);
        res.json(emails);
    } catch (error) {
        console.error("Error fetching emails:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;