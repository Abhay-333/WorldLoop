import { config } from "dotenv";
config();
import { z } from "zod";
import logger from "./logger.js";

const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGO_URI: z.string(),
  NODE_ENV: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("Invalid env please check your env");
}

export default parsed.data;
