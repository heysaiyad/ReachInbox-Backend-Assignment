const Imap = require("imap-simple");
const { simpleParser } = require("mailparser");
const { convert } = require("html-to-text");
const { Readable } = require("stream");
const Email = require("../models/Email");
const { indexEmail } = require("../services/elasticService");

// Categories for email labeling
const categories = [
    { label: "Interested", keywords: ["interested", "yes", "keen"] },
    { label: "Meeting Booked", keywords: ["meeting", "appointment", "calendar"] },
    { label: "Not Interested", keywords: ["not interested", "decline", "no"] },
    { label: "Spam", keywords: ["unsubscribe", "offer", "free"] },
    { label: "Out of Office", keywords: ["out of office", "leave", "not available"] },
];

// Function to categorize emails
const categorizeEmail = (emailBody) => {
    for (const category of categories) {
        for (const keyword of category.keywords) {
            if (emailBody.toLowerCase().includes(keyword.toLowerCase())) {
                return category.label;
            }
        }
    }
    return "Uncategorized"; // Default label if no match
};

async function syncEmails() {
    const config = {
        imap: {
            user: process.env.EMAIL,
            password: process.env.PASSWORD,
            host: process.env.IMAP_HOST,
            port: parseInt(process.env.IMAP_PORT),
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
        },
    };

    try {
        console.log("Connecting to IMAP...");
        const connection = await Imap.connect(config);
        console.log("Connected to IMAP!");

        await connection.openBox("INBOX");

        connection.on("mail", async () => {
            console.log("New mail received!");

            const results = await connection.search(["UNSEEN"], {
                bodies: ["HEADER", "TEXT", ""],
                markSeen: true,
            });

            results.forEach(async (email) => {
                const headerPart = email.parts.find((part) => part.which === "HEADER");
                const textPart = email.parts.find((part) => part.which === "TEXT");
                const rawBody = textPart?.body || "";
                const stream = Readable.from(rawBody);

                // Parse headers to get subject and sender
                const headers = headerPart?.body || {};
                const subject = headers.subject ? headers.subject[0] : "No Subject";
                const sender = headers.from ? headers.from[0] : "No Sender";

                // Parse body
                simpleParser(stream, async (err, parsed) => {
                    if (err) {
                        console.error("Error parsing email:", err);
                        return;
                    }

                    const sanitizedBody = convert(parsed.html || parsed.text || "No Body Content", {
                        wordwrap: 130,
                        selectors: [
                            { selector: "img", format: "skip" },
                            { selector: "style", format: "skip" },
                        ],
                    });

                    const cleanedBody = sanitizedBody
                        .replace(/--.*Content-Type:.*charset=".*"\s*/gi, "")
                        .replace(/--\S+--/g, "")
                        .trim();

                    // Categorize the email
                    const label = categorizeEmail(cleanedBody);

                    // Save email to MongoDB
                    try {
                        const newEmail = new Email({
                            subject: subject,
                            sender: sender,
                            body: cleanedBody,
                            date: parsed.date || new Date(),
                            folder: "INBOX",
                            account: "Account 1",
                            label: label, // Categorized label
                        });

                        await newEmail.save();
                        console.log("Email saved to MongoDB:", newEmail);

                        // Index email in Elasticsearch
                        await indexEmail(newEmail);
                    } catch (error) {
                        console.error("Error saving email to MongoDB:", error);
                    }
                });
            });
        });
    } catch (error) {
        console.error("Error syncing emails:", error);
    }
}

module.exports = syncEmails;
