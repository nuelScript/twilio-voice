import { confirmLink, resetLink } from "@/constants/url";
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Twilio App <${process.env.EMAIL_ADDRESS}>`,
    to: `${email}`,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmLink(token, email)}">${confirmLink(token, email)}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Twilio App <${process.env.EMAIL_ADDRESS}>`,
    to: `${email}`,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink(token, email)}">${resetLink(token, email)}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
