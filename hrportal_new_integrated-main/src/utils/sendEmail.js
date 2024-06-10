import { createMailTransport } from "./createMailTransport.js";

const sendMail = async (userData) => {
    // Create a mail transporter
    const transporter = createMailTransport();
     console.log(userData);
    // Set up mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: "Verify your email",
        html: `
        <div style="background-color: #fff; border-radius: 5px; padding: 30px; text-align: center; margin: 0 auto; width: 400px;">
        <h1>Verify Your Email Address</h1>
        <p style="font-size: 16px; margin-bottom: 20px;">To complete your signup, please click the link below to verify your email address:</p>
        <a href="http://localhost:5173/verify-email/${userData.email_token}" style="display: inline-block; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; color: #fff; background-color: #007bff; cursor: pointer; text-decoration: none;">Verify Email</a>
        </div>
            
        `
    };
    if (!mailOptions.to) {
        console.error('Recipient email not defined');
        return;
      }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error while sending verification email:", error);
        } else {
            console.log("Verification email sent:", info.response);
        }
    });
};

export { sendMail };
