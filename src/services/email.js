import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (email) => {
  try {
    console.log('Environment variables check:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_FROM:', process.env.SMTP_FROM);
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
    console.log('APP_DOMAIN:', process.env.APP_DOMAIN);

    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    const resetUrl = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
      text: `You requested a password reset. Visit this link to reset your password: ${resetUrl}. This link will expire in 5 minutes.`,
    };

    console.log('Trying to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};