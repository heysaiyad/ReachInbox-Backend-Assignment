const express = require("express");
const { searchEmails } = require("../services/elasticService");

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

module.exports = router;