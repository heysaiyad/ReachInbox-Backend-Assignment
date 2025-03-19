const Imap = require("imap-simple");
const { simpleParser } = require("mailparser");

async function syncEmails() {
    const config = {
        imap: {
            user: process.env.EMAIL,
            password: process.env.PASSWORD,
            host: process.env.IMAP_HOST,
            port: parseInt(process.env.IMAP_PORT),
            tls: true,
            tlsOptions: { rejectUnauthorized: false }, // Ignore SSL certificate errors
        },
    };

    try {
        console.log("Connecting to IMAP...");
        const connection = await Imap.connect(config);
        console.log("Connected to IMAP!");

        await connection.openBox("INBOX");

        connection.on("mail", async () => {
            console.log("New mail received!");
            const results = await connection.search(["ALL"], {
                bodies: ["TEXT"],
                markSeen: false,
            });

            results.forEach((email) => {
                simpleParser(email.parts[0].body, (err, parsed) => {
                    if (err) {
                        console.error("Error parsing email:", err);
                        return;
                    }
                    console.log("New Email:");
                    console.log("Subject:", parsed.subject);
                    console.log("From:", parsed.from.text);
                    console.log("Body:", parsed.text);
                });
            });
        });
    } catch (error) {
        console.error("Error syncing emails:", error);
    }
}

module.exports = syncEmails;
