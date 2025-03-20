import React, { useState } from "react";
import EmailDetails from "./EmailDetails";
import "./EmailList.css"; // Import CSS styles for the component

const EmailList = ({ emails }) => {
    const [selectedEmail, setSelectedEmail] = useState(null);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const closeDetails = () => {
        setSelectedEmail(null);
    };

    return (
        <div className="email-list">
            <h1>Email List</h1>
            {emails.length === 0 ? (
                <p>No emails found.</p>
            ) : (
                <ul>
                    {emails.map((email) => (
                        <li key={email._id} onClick={() => handleEmailClick(email)}>
                            <strong>{email.subject}</strong>
                            <br />
                            <span>{email.sender}</span>
                        </li>
                    ))}
                </ul>
            )}

            {selectedEmail && <EmailDetails email={selectedEmail} onClose={closeDetails} />}
        </div>
    );
};

export default EmailList;
