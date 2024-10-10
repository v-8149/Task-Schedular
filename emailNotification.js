const nodemailer = require('nodemailer');

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your Gmail address
        pass: 'your-app-password'      // Your Gmail App password (NOT your Gmail account password)
    }
});

// Function to send email
function sendDeadlineNotification(taskName, deadline) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',  // The recipient's email
        subject: 'Task Deadline Reminder',
        text: `Reminder: The task "${taskName}" is due on ${deadline}. Please complete it before the deadline.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

// Export the function so it can be used in other scripts
module.exports = { sendDeadlineNotification };
