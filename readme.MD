# Email Onebox Codebase Documentation

## Overview
The **Email Onebox** project is a full-stack application designed to manage emails efficiently. It provides features like email categorization, search, pagination, and email deletion. The application is built using modern web technologies and follows a modular architecture for scalability and maintainability.

---

## Features
1. **Email Management**:
   - Fetch and display emails with pagination.
   - Search emails by subject, sender, or body.
   - Filter emails by predefined labels (e.g., Interested, Spam, etc.).
   - Delete emails.

2. **Email Categorization**:
   - Automatically categorize emails based on their content using keywords.

3. **Email Details**:
   - View detailed information about an email in a modal.

4. **Elasticsearch Integration**:
   - Full-text search functionality for emails.

5. **Real-Time Email Sync**:
   - Sync emails from an IMAP server and store them in MongoDB.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Axios**: For making API requests.
- **CSS**: For styling components.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For storing email data.
- **Mongoose**: For MongoDB object modeling.
- **Elasticsearch**: For full-text search capabilities.
- **IMAP**: For syncing emails from an email server.
- **Mailparser**: For parsing email content.

### Other Tools
- **dotenv**: For managing environment variables.
- **Nodemailer**: For email-related operations.
- **html-to-text**: For sanitizing email content.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Elasticsearch (local or cloud instance)
- IMAP email account credentials

### Steps to Run the Application

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install dependencies:
    ```bash
    npm install
3. Create a .env file in the backend directory with the following variables:
```
MONGO_URI=<Your MongoDB Connection String>
EMAIL=<Your IMAP Email Address>
PASSWORD=<Your IMAP Email Password>
IMAP_HOST=<Your IMAP Host>
IMAP_PORT=<Your IMAP Port>
```

4. Start the backend server:
    ```bash
    node server.js

#### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend

2. Install dependencies:
    ```bash
    npm install
3. Start the frontend development server:
    ```bash
    npm start

4. Open the application in your browser at http://localhost:3000.


# Email Application

## Folder Structure

### Frontend
- **src/components**: Contains reusable React components like `EmailList` and `EmailDetails`.
- **src/services**: Contains API service files for making HTTP requests.
- **src**: Contains the main `App.js` file and global styles.

### Backend
- **models**: Contains Mongoose models (e.g., `Email.js`).
- **routes**: Contains Express route handlers (e.g., `emailRoutes.js`).
- **services**: Contains utility services like `syncEmails` and `elasticService`.
- **server.js**: Entry point for the backend server.

## Future Enhancements

### User Authentication
- Add user login and registration functionality.
- Secure email data by associating it with user accounts.

### Advanced Search
- Add filters for date range, sender, and folder.

### Email Reply/Forward
- Implement functionality to reply to or forward emails directly from the app.

### Real-Time Updates
- Use WebSockets to notify users of new emails in real-time.

### Improved UI/UX
- Add animations and improve responsiveness for mobile devices.

### Email Attachments
- Support viewing and downloading email attachments.

### Deployment
- Deploy the application to a cloud platform like AWS, Azure, or Heroku.
