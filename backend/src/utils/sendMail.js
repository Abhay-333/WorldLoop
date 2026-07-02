import transporter from "../config/mail";
import env from "../config/env.js";

const sendEmail = async ({ to, subject, from }) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
  });
};

export default sendEmail;
