import sendEmail from "./sendMail.js";

export const sendVerifyLink = async (user,verifyLink) => {
  return await sendEmail({
    to: user.email,
    subject: "Verify your email",
    html: `
    <h2>Email Verification</h2>
    <p>Click below to verify your email.</p>
    <a href="${verifyLink}">Verify Email</a>
    <p>This link expires in 15 minutes.</p>
  `,
  });
};
