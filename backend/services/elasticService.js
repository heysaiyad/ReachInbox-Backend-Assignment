const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({ node: "http://localhost:9200" });


const indexEmail = async (email) => {
    try {
        const response = await elasticClient.index({
            index: "emails",
            id: email._id.toString(), 
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

       
        const response = await elasticClient.search(esQuery);

        console.log("Full Elasticsearch Response:", response);

        
        const hits = response.hits?.hits;

        if (!hits || !Array.isArray(hits)) {
            console.error("Unexpected Elasticsearch response structure:", response);
            throw new Error("Invalid Elasticsearch response structure");
        }

 
        const results = hits.map((hit) => hit._source);

        console.log("Search Results:", results);
        return results;
    } catch (error) {
        console.error("Error searching emails:", error.message);
        throw error;
    }
};
module.exports = { indexEmail, searchEmails };