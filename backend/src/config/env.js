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
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("Invalid env please check your env");
}

export default parsed.data;
