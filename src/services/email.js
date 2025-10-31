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
  // Test amaçlı geçici olarak email gönderimini mock yapalım
  console.log(`[MOCK EMAIL] Password reset email sent to: ${email}`);
  
  const resetToken = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '5m' }
  );

  const resetUrl = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;
  
  console.log(`[MOCK EMAIL] Reset URL: ${resetUrl}`);
  
  // Gerçek email gönderimi yerine mock response
  return {
    messageId: 'mock-' + Date.now(),
    response: 'Mock email sent successfully'
  };
};