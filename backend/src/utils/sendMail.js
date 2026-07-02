import transporter from "../config/mail";
import env from "../config/env.js";

const sendEmail = async ({ to, subject,html }) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
  });
};

export default sendEmail;
