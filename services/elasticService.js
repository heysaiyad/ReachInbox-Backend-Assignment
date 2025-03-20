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

// Function to search emails
const searchEmails = async (query, folder, account) => {
    try {
        console.log("Search Parameters:", { query, folder, account });

        const esQuery = {
            index: "emails",
            body: {
                query: {
                    bool: {
                        must: [
                            { multi_match: { query, fields: ["subject", "sender", "body"] } },
                            { term: { "folder.keyword": folder } },
                            { term: { "account.keyword": account } },
                        ],
                    },
                },
            },
        };

        console.log("Constructed Elasticsearch Query:", JSON.stringify(esQuery, null, 2));

        // Perform the search
        const response = await elasticClient.search(esQuery);

        // Log the full response for debugging
        console.log("Full Elasticsearch Response:", response);

        // Access hits directly (for Elasticsearch client 8.x and above)
        const hits = response.hits?.hits;

        if (!hits || !Array.isArray(hits)) {
            console.error("Unexpected Elasticsearch response structure:", response);
            throw new Error("Invalid Elasticsearch response structure");
        }

        // Extract and return the _source property from hits
        const results = hits.map((hit) => hit._source);

        console.log("Search Results:", results);
        return results;
    } catch (error) {
        console.error("Error searching emails:", error.message);
        throw error;
    }
};
module.exports = { indexEmail, searchEmails };