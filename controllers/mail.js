const nodeMailer = require("nodemailer");
const mailgun = require("mailgun-js");

exports.sendMail = (req, res) => {
  // Logic to send mail
  const { name, email, phone, message } = req.body;

  //send acknowledgment to user using mailgun
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  //   send mail to support team
  const transporter = nodeMailer.createTransporter({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

    //   compose mail options for client
  const mailOptions = {
    from: '"OKG Consult" <support@okgconsult.com>',
    to: email,
    replyTo: process.env.NODEMAILER_USER,
    subject: "Thank you for contacting OKG Consult",
    text: "Thank you for reaching out to OKG Consult.\n\n",
    html: `<p>Dear ${name},</p>
           <p>Thank you for contacting OKG Consult. We have received your message and will get back to you shortly.</p>
           <p>Here is a summary of your message:${message} \n And your phone number: ${phone}</p>
           <p>We appreciate your interest in our services and look forward to assisting you.</p>
           <p>If you have any further questions, feel free to reply to this email or contact us at <a href="mailto: info@okgconsult.com">info@okgconsult.com</a>.</p>
           <p>Best regards,<br/>OKG Consult Team</p>`,
  };
  //   compose mail options for support team
  const mailOptions2 = {
    from: '"OKG Consult" <info@okgconsult.com>',
    to: "support@okgconsult.com",
    replyTo: process.env.NODEMAILER_USER,
    subject: "New Contact Form Submission",
    text: "You have a new contact form submission.\n\n",
    html: `<p>Dear uupport team,</p>
           <p>Please find the details of the new contact form submission below:</p>
           <p>Summary of the message:${message} \n And customer's phone number: ${phone}</p>
           <p>We appreciate your interest in our services and look forward to assisting you.</p>
           <p>Best regards,<br/>OKG Consult Team</p>`,
  };

    //   compose mail options for info team
  const mailOptions3 = {
    from: '"OKG Consult" <info@okgconsult.com>',
    to: "info@okgconsult.com",
    subject: "New Contact Form Submission",
    text: "You have a new contact form submission.\n\n",
    html: `<p>Dear uupport team,</p>
           <p>Please find the details of the new contact form submission below:</p>
           <p>Summary of the message:${message} \n And customer's phone number: ${phone}</p>
           <p>We appreciate your interest in our services and look forward to assisting you.</p>
           <p>Best regards,<br/>OKG Consult Team</p>`,
  };

    //   send mail to client
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        // Log errors
      console.log(error);
      res.status(500).send("Error sending mail");
    } else {
        // Log successful email sending
      console.log("Email sent: " + info.response);
      res.send("Mail sent");
    }
  });

    //   send mail to support team
  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
        // Log errors
      console.log(error);
      res.status(500).send("Error sending mail");
    } else {
        // Log successful email sending
      console.log("Email sent: " + info.response);
      res.send("Mail sent");
    }
  });

    //   send mail to info team
  transporter.sendMail(mailOptions3, (error, info) => {
    // Check for errors
    if (error) {
      console.log(error);
      res.status(500).send("Error sending mail");
    } else {
        // Log successful email sending
      console.log("Email sent: " + info.response);
      res.send("Mail sent");
    }
  });
};
