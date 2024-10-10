const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const schedule = require('node-schedule'); // Import node-schedule
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivadevaishanvi0@gmail.com',
        pass: 'itownawkkbjjbmdl' // Consider using an app password
    }
});

// Function to send an email
function sendEmail(task) {
    const mailOptions = {
        from: 'shivadevaishnavi0@gmail.com',
        to: 'shivadevaishnavi@gmail.com',
        subject: 'Task Deadline Notification',
        text: `Reminder: The task "${task.name}" is due on ${task.deadline}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending email:', error);
        }
        console.log('Email sent successfully: ' + info.response);
    });
}

// Schedule an email for a specific time
app.post('/schedule-email', (req, res) => {
    const task = req.body; // Assuming task has { name, deadline }
    const deadlineDate = new Date(task.deadline); // Ensure this is a valid date object

    // Schedule the email to be sent 1 hour before the deadline
    const scheduledTime = new Date(deadlineDate.getTime() - (60 * 60 * 1000)); // 1 hour before

    console.log(`Scheduling email for task: ${task.name} at ${scheduledTime}`);

    schedule.scheduleJob(scheduledTime, () => {
        sendEmail(task); // Send the email when the time comes
    });

    res.send('Email scheduled for task: ' + task.name);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
