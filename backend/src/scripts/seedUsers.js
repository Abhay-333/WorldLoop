import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";
import logger from "../config/logger.js";
import env from "../config/env.js";

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
  fullName: faker.person.fullName(),
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
const assignRandomFollows = async (users) => {
  const bulkOps = [];
  for (const user of users) {
    const others = users.filter(
      (u) => u._id.toString() !== user._id.toString(),
    );

    const followCount = faker.number.int({
      min: 0,
      max: Math.min(15, others.length),
    });

    const toFollow = faker.helpers.arrayElements(others, followCount);
    if (toFollow.length === 0) continue;

    bulkOps.push({
      updateOne: {
        filter: { _id: user._id },
        update: {
          $addToSet: { following: { $each: toFollow.map((u) => u._id) } },
        },
      },
    });

    for (const followUser of toFollow) {
      bulkOps.push({
        updateOne: {
          filter: { _id: followUser._id },
          update: { $addToSet: { followers: user._id } },
        },
      });
    }
  }

  if (bulkOps.length > 0) {
    await UserModel.bulkWrite(bulkOps);
  }
};

// ---------- Posts ----------
const buildFakePost = (author, allUsers) => {
  const mediaCount = faker.number.int({ min: 1, max: 4 });
  const media = Array.from({ length: mediaCount }, () => ({
    publicId: `seed/posts/${faker.string.uuid()}`,
    url: faker.image.url({ width: 1080, height: 1080 }),
    type: "image",
    width: 1080,
    height: 1080,
  }));

  const others = allUsers.filter(
    (u) => u._id.toString() !== author._id.toString(),
  );

  const likeCount = faker.number.int({
    min: 0,
    max: Math.min(40, others.length),
  });

  const likes = faker.helpers
    .arrayElements(others, likeCount)
    .map((u) => u._id);

  const taggedCount =
    faker.helpers.maybe(
      () => faker.number.int({ min: 1, max: Math.min(3, others.length) }),
      { probability: 0.2 },
    ) ?? 0;

  const taggedUsers = faker.helpers
    .arrayElements(others, taggedCount)
    .map((u) => u._id);

  return {
    author: author._id,
    caption:
      faker.helpers.maybe(() => faker.lorem.sentence({ min: 4, max: 20 }), {
        probability: 0.85,
      }) ?? "",

    media,
    location: faker.helpers.maybe(
      () => ({
        name: `${faker.location.city()}, ${faker.location.country()}`,
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      }),
      { probability: 0.3 },
    ),

    taggedUsers,
    likes,
    commentsCount: faker.number.int({ min: 0, max: 35 }),
    createdAt: faker.date.recent({ days: 60 }),
  };
};

const seedPosts = async (users) => {
  const postsData = [];

  for (const author of users) {
    const postCount = faker.number.int({ min: 0, max: MAX_POSTS_PER_USER });

    for (let i = 0; i < postCount; i++) {
      postsData.push(buildFakePost(author, users));
    }
  }

  if (postsData.length <= 0) return [];

  // insertMany is safe here (unlike users) since Post has no
  // password-hashing hook to worry about skipping
  const createPosts = await PostModel.insertMany(postsData);
  return createPosts;
};

// ---------- Main ----------
const run = async () => {
  logger.info("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  logger.info("Connected.");

  if (SHOULD_CLEAR) {
    logger.info("Clearing existing users and posts...");
    const { deletedCount: usersDeleted } = await UserModel.deleteMany({});
    const { deletedCount: postsDeleted } = await PostModel.deleteMany({});
    logger.info(`Deleted ${usersDeleted} users and ${postsDeleted} posts.`);
  }

  logger.info(`Generating ${USER_COUNT} fake users...`);

  const fakeUsersData = Array.from({ length: USER_COUNT }, (_, i) =>
    buildFakeUser(i),
  );

  // Created one-by-one (not insertMany) so the model's pre('save')
  // password-hashing hook actually runs for each document.

  const createdUsers = [];

  for (const userData of fakeUsersData) {
    const user = await UserModel.create(userData);
    createdUsers.push(user);
  }

  logger.info(`Created ${createdUsers.length} users.`);
  logger.info(`Assigning random follow relationships...`);
  await assignRandomFollows(createdUsers);

  logger.info(`Generating up to ${MAX_POSTS_PER_USER} posts per user...`);
  const createdPosts = await seedPosts(createdUsers);
  logger.info(`Created ${createdPosts.length} posts.`);
  logger.info(`\n✅ Seed complete!`);
  logger.info(`All seeded users share the password: "${DEFAULT_PASSWORD}"`);
  logger.info(
    `Sample login -> email: ${createdUsers[0].email} | password: ${DEFAULT_PASSWORD}`,
  );

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  logger.error({ err }, "Seeding failed");
  process.exit(1);
});
