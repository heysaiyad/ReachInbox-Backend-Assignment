import React, { useEffect, useState } from "react";
import api from "../src/services/api";
import EmailList from "./components/EmailList";
import "./App.css"; 

const App = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalEmails, setTotalEmails] = useState(0);
    const emailsPerPage = 10;

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await api.get("/emails", {
                    params: { label, query: searchQuery, page, limit: emailsPerPage },
                });
                setEmails(response.data.emails);
                setTotalEmails(response.data.totalEmails);
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [label, searchQuery, page]); 

    const totalPages = Math.ceil(totalEmails / emailsPerPage);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Email Management</h1>
            </header>

            <div className="filters-container">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />

                {/* Label Filter Dropdown */}
                <select
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                    className="filter-dropdown"
                >
                    <option value="">All</option>
                    <option value="Interested">Interested</option>
                    <option value="Meeting Booked">Meeting Booked</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Spam">Spam</option>
                    <option value="Out of Office">Out of Office</option>
                </select>
            </div>

            {/* Email List */}
            {loading ? (
                <p>Loading emails...</p>
            ) : (
                <EmailList emails={emails} setEmails={setEmails} />
            )}

            {/* Pagination Controls */}
            <div className="pagination-container">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;