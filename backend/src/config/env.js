import { config } from "dotenv";
config();
import { z } from "zod";
import logger from "./logger.js";
import appConstant from "../constants/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGO_URI: z.string(),
  NODE_ENV: z.string(),

  MORGAN_LOGGER: z.string().default(appConstant.MORGAN_LOGGER),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),

  JWT_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  MAIL_PORT: z.coerce.number(), // SMTP server port number used in TLS(transport layer security)
  MAIL_HOST: z.string(), //SMTP Server address from which nodemailer will connect and send the email
  MAIL_USER: z.string(), // from which email the mail will be sent
  MAIL_APP_PASSWORD: z.string(), // Google App password
  MAIL_FROM: z.string(), // In Email to show the "From: " field
  CLIENT_URL: z.string(), // After the forget-password user will be redirected to this url

  /**
   * @description Google Credentials
   */

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  SESSION_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("Invalid env please check your env");
}

export default parsed.data;
