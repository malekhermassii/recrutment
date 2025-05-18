const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-emails', (req, res) => {
  const { to, subject, message } = req.body;

  // Configure the transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jobavailablenow11@gmail.com', // Update with your email
      pass: 'fuwbjxhryssjszor' // Update with your password
    }
  });

  const mailOptions = {
    from: 'jobavailablenow11@gmail.com', // Update with your email
    to: to,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(`Failed to send email: ${error}`);
      res.sendStatus(500); // Send an error response to the client
    } else {
      console.log(`Email sent: ${info.response}`);
      res.sendStatus(200); // Send a success response to the client
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
