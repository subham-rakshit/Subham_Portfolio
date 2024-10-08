import nodemailer from "nodemailer";
import {
  SMTP_HOST,
  SMTP_MAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
} from "../config/envConfig.js";

//NOTE: Nodemailer transporter
export const mailTransport = () => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT, //INFO: Typically 587 for TLS, 465 for SSL
    secure: false, //INFO: Use `true` for port 465, `false` for all other ports
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });
  return transporter;
};

export const contactInfoEmailTemplate = (
  userName,
  companyName,
  jobRole,
  moreInfoJobRole,
  userEmail,
  userPhoneNumber
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            color: white;
            text-align: center;
        }
        h2 {
            margin-bottom: 20px;
            color: #4CAF50;
        }
        .detail {
            margin-bottom: 10px;
        }
        .detail span {
            font-weight: bold;
            color: #555;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Query</h1>
        </div>

        <div class="content">
            <h2>Contact Details</h2>
            <div class="detail">
                <span>Name:</span> ${userName}
            </div>
            <div class="detail">
                <span>Company:</span> ${companyName}
            </div>
            <div class="detail">
                <span>Job Role:</span> ${jobRole}
            </div>
            <div class="detail">
                <span>More Info on Job Role:</span> ${moreInfoJobRole}
            </div>
            <div class="detail">
                <span>Email:</span> <a href="mailto:${userEmail}">${userEmail}</a>
            </div>
            <div class="detail">
                <span>Phone Number:</span> <a href="tel:${userPhoneNumber}">${userPhoneNumber}</a>
            </div>
        </div>

        <div class="footer">
            <p>This email was automatically generated by your contact form.</p>
        </div>
    </div>
</body>
</html>
  `;
};
