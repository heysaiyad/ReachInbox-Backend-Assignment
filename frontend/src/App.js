import React, { useEffect, useState } from "react";
import api from "../src/services/api";
import EmailList from "./components/EmailList";

const App = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await api.get("/emails");
                setEmails(response.data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    return (
        <div>
            {loading ? <p>Loading emails...</p> : <EmailList emails={emails} />}
        </div>
    );
};

export default App;
