import React, { useEffect, useState } from "react";
import api from "../src/services/api";
import EmailList from "./components/EmailList";

const App = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                console.log("Fetching emails with label:", label, "and search query:", searchQuery);
                const response = await api.get("/emails", { params: { label, query: searchQuery } });
                console.log("API Response:", response.data);
                setEmails(response.data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [label, searchQuery]); 

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Label Filter Dropdown */}
            <select
                onChange={(e) => {
                    console.log("Selected label:", e.target.value);
                    setLabel(e.target.value);
                }}
                value={label}
            >
                <option value="">All</option>
                <option value="Interested">Interested</option>
                <option value="Meeting Booked">Meeting Booked</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Spam">Spam</option>
                <option value="Out of Office">Out of Office</option>
            </select>

            {/* Email List */}
            {loading ? <p>Loading emails...</p> : <EmailList emails={emails} />}
        </div>
    );
};

export default App;