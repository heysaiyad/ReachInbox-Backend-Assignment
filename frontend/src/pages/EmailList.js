import React, { useEffect, useState } from "react";
import api from "../services/api";

const EmailList = () => {
  const [emails, setEmails] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await api.get("/emails"); 
        console.log("API Response:", response.data); 
        setEmails(response.data); 
      } catch (error) {
        console.error("Error fetching emails:", error); 
      } finally {
        setLoading(false); 
      }
    };

    fetchEmails(); 
  }, []);

  if (loading) return <p>Loading emails...</p>; 

  return (
    <div>
      <h1>Email List</h1>
      {console.log("Emails State:", emails)}
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul>
          {emails.map((email) => (
            <li key={email._id}>
              <strong>{email.subject}</strong> - {email.sender}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;