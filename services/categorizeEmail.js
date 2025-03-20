function categorizeEmail(emailBody) {
    const categories = [
        { label: "Interested", keywords: ["interested", "yes", "keen"] },
        { label: "Meeting Booked", keywords: ["meeting", "appointment", "calendar"] },
        { label: "Not Interested", keywords: ["not interested", "decline", "no"] },
        { label: "Spam", keywords: ["unsubscribe", "offer", "free"] },
        { label: "Out of Office", keywords: ["out of office", "leave", "not available"] },
    ];

    for (const category of categories) {
        for (const keyword of category.keywords) {
            if (emailBody.toLowerCase().includes(keyword.toLowerCase())) {
                return category.label;
            }
        }
    }

    return "Uncategorized"; // Default label
}

module.exports = categorizeEmail;
