import nodemailer from 'nodemailer';


// const simpleHtml = `
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Test Email</title>
// </head>
// <body>
//   <h1>Hello, World!</h1>
//   <p>This is a test email.</p>
// </body>
// </html>
// `;

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

 
  },
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS ,"email and password from nodemailer")
);


  
  export const sendEmail = async (to,verificationUrl) => {
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: Arial, sans-serif;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      margin-top: 20px;
    }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Email Verification</h1>
        <p>Please verify your email address by clicking on the button below:</p>
          <a href="${verificationUrl}" 
       style="display: inline-block; 
              padding: 12px 24px; 
              font-size: 16px; 
              font-weight: 600; 
              color: #ffffff; 
              background-color: #3b82f6; 
              text-decoration: none; 
              border-radius: 8px; 
              text-align: center; 
              margin-top: 20px;">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
        <div class="footer">
          <p>Thank you for using our service!</p>
          <p>&copy; ${new Date().getFullYear()} NexGen News</p>
        </div>
      </div>
    </body>
    </html>
    `;

    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject:" please verify your email",
        html:emailHtml,
        
    };
    console.log(mailOptions,"mail options")

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};