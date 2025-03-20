import React, { useState } from "react";
import EmailDetails from "./EmailDetails";
import api from "../services/api"; 
import "./EmailList.css"; 

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
            await api.delete(`/emails/${id}`); 
            setEmails(emails.filter((email) => email._id !== id)); 
        } catch (error) {
            console.error("Error deleting email:", error);
        }
    };

    return (
        <div className="email-list">
            <h1>Email List</h1>
            {emails.length === 0 ? (
                <p className="no-emails">No emails found.</p>
            ) : (
                <ul>
                    {emails.map((email) => (
                        <li key={email._id} className="email-item">
                            <div
                                className="email-content"
                                onClick={() => handleEmailClick(email)} 
                                style={{ cursor: "pointer" }} 
                            >
                                <strong>{email.subject}</strong>
                                <br />
                                <span>{email.sender}</span>
                                <br />
                                <span className="email-label">{email.label || "No Label"}</span>
                            </div>
                            <button onClick={() => handleDelete(email._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Render EmailDetails modal if an email is selected */}
            {selectedEmail && <EmailDetails email={selectedEmail} onClose={closeDetails} />}
        </div>
    );
};

export default EmailList;