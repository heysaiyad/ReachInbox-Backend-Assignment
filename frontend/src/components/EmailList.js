import React, { useState } from "react";
import EmailDetails from "./EmailDetails";
import api from "../services/api"; // Import API service
import "./EmailList.css"; // Import CSS styles for the component

const EmailList = ({ emails, setEmails }) => {
    const [selectedEmail, setSelectedEmail] = useState(null);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const closeDetails = () => {
        setSelectedEmail(null);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/emails/${id}`); // Call DELETE API
            setEmails(emails.filter((email) => email._id !== id)); // Update state to remove deleted email
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };

    return (
        <div className="email-list">
            <h1>Email List</h1>
            {emails.length === 0 ? (
                <p>No emails found.</p>
            ) : (
                <ul>
                    {emails.map((email) => (
                        <li key={email._id}>
                            <div onClick={() => handleEmailClick(email)}>
                                <strong>{email.subject}</strong>
                                <br />
                                <span>{email.sender}</span>
                            </div>
                            <button onClick={() => handleDelete(email._id)}>Delete</button> {/* Delete button */}
                        </li>
                    ))}
                </ul>
            )}

            {selectedEmail && <EmailDetails email={selectedEmail} onClose={closeDetails} />}
        </div>
    );
};

export default EmailList;
