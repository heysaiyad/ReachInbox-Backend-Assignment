import React from "react";
import "./EmailDetails.css"; // Import CSS styles for the component

const EmailDetails = ({ email, onClose }) => {
    if (!email) return null;

    return (
        <div className="email-details-overlay">
            <div className="email-details-modal">
                <button onClick={onClose} className="close-button">
                    Close
                </button>
                <h2>{email.subject}</h2>
                <p>
                    <strong>From:</strong> {email.sender}
                </p>
                <p>
                    <strong>Date:</strong> {new Date(email.date).toLocaleString()}
                </p>
                <p>
                    <strong>Label:</strong> {email.label}
                </p>
                <hr />
                <div className="email-body">{email.body}</div>
            </div>
        </div>
    );
};

export default EmailDetails;
