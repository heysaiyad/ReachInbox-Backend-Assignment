const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({ node: "http://localhost:9200" });

// Function to index an email
const indexEmail = async (email) => {
    try {
        const response = await elasticClient.index({
            index: "emails",
            id: email._id.toString(), // Use MongoDB ID as the Elasticsearch document ID
            document: {
                subject: email.subject,
                sender: email.sender,
                body: email.body,
                date: email.date,
                folder: email.folder,
                account: email.account,
            },
        });
        console.log("Email indexed successfully:", response);
    } catch (error) {
        console.error("Error indexing email:", error.message);
    }
};

module.exports = { indexEmail };
