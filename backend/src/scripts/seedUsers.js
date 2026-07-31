import mongoose, { get, Mongoose } from "mongoose";
import { faker } from "@faker-js/faker";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";
import logger from "../config/logger";
import env from "../config/env";

// ---------- CLI args ----------
const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const match = args.find((a) => a.startsWith(`--${name}=`));
  return match ? match.split("=")[1] : fallback;
};

// console.log(getArg(abhay,10))
const USER_COUNT = parseInt(getArg("count", "30"), 10);
const MAX_POSTS_PER_USER = parseInt(getArg("posts", "8"), 10);
const SHOULD_CLEAR = args.includes("--clear");
const DEFAULT_PASSWORD = getArg("password", "Password123!");
const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
  logger.error("MONGO_URI not found. Check that backend/.env has it set.");
  process.exit(1);
}

if (env.NODE_ENV === "production" && !args.includes("--force")) {
  logger.error(
    "Refusing to run against NODE_ENV=production. Pass --force if you really mean it.",
  );
  process.exit(1);
}

// ---------- Uniqueness guards (faker can repeat names on large counts) ----------

const usedUsername = new Set();
const usedEmails = new Set();

const generateUniqueUsername = () => {
  let username;

  do {
    username = faker.internet
      .username()
      .toLowerCase()
      .replace(/[^a-z0-9_.]/g, "")
      .slice(0, 30);
  } while (username.length < 3 || usedUsername.has(username));
  usedUsername.add(username);
  return username;
};

const generateUniqueEmail = () => {
  let email;
  do {
    email = faker.internet.email().toLowerCase();
  } while (usedEmails.has(email));
  usedEmails.add(email);
  return email;
};

const buildFakeUser = (index) => ({
  username: generateUniqueUsername(),
  fullName: faker.internet.fullName(),
  email: generateUniqueEmail(),
  password: DEFAULT_PASSWORD,
  bio:
    faker.helpers.maybe(() => faker.lorem.sentence({ min: 3, max: 14 }), {
      probability: 0.8,
    }) ?? "",

  avatar: {
    publicId: `seed/avatars/${faker.string.uuid()}`,
    url: faker.image.avatar(),
  },

  coverImage: {
    publicId: `seed/covers/${faker.string.uuid()}`,
    url: faker.image.url({ width: 1200, height: 400 }),
  },

  isEmailVerified: true,
  lastSeen: faker.date.recent({ days: 14 }),
});

// ---------- Random follow graph ----------
const assignRandomFollows = async(users)=>{}