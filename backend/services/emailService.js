const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"SkillMart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your SkillMart Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="color:#2563eb;">Welcome to SkillMart</h2>

        <p>Thank you for registering.</p>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:5px; text-align:center; color:#16a34a;">
          ${otp}
        </h1>

        <p>This OTP will expire in <strong>10 minutes</strong>.</p>

        <p>If you didn't create this account, you can ignore this email.</p>

        <hr>

        <small>SkillMart Team</small>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
const sendResetOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"SkillMart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "SkillMart Password Reset OTP",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">

        <h2 style="color:#2563eb">
          Reset Your Password
        </h2>

        <p>We received a request to reset your SkillMart password.</p>

        <p>Your OTP is:</p>

        <h1 style="letter-spacing:6px;text-align:center;color:#dc2626;">
          ${otp}
        </h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>If you didn't request this, you can safely ignore this email.</p>

        <hr>

        <small>SkillMart Security Team</small>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = {
  sendOTPEmail,
  sendResetOTPEmail,
};