import { config } from "dotenv";
config();
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGO_URI: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  //logger error
  console.log("Invalid env please check your env");
}

export default parsed.data;
