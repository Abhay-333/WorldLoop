import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("MongoDb connected");
  } catch (error) {
    logger.error("MongoDb connection failed", error);
    throw error;
  }
};
