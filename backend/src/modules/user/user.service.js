import PostsRepository from "../../repositories/post.repository.js";
import UserRepo from "../../repositories/user.repository.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../utils/Errors/app-errors.js";
import env from "../../config/env.js";
import cloudinary from "cloudinary";
import uploadToCloudinary from "../../utils/cloudinary.js";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
    this.postRepo = new PostsRepository();
  }

  async getUserProfileService(username) {
    if (!username) throw new BadRequestError("Username is Required.");
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new NotFoundError("User not found.");
    }
    return user;
  }

  async updateProfileService(userId, profileData) {
    if (!userId) throw new BadRequestError("User id is Required.");

    const allowedFields = ["fullName", "bio", "website", "location"];
    const updates = {};

    for (const field of allowedFields) {
      if (profileData[field] !== undefined) {
        updates[field] = profileData[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new BadRequestError("No valid fields provided.");
    }

    const user = await this.userRepo.updateById(userId, updates);

    if (!user) throw new NotFoundError("User not found.");

    return user;
  }

  async getUserPostsService(userId) {
    if (!userId) throw new BadRequestError("User id is Required.");

    return await this.postRepo.findByAuthorId(userId);
  }

  async updateAvatarService(userId, file) {
    if (!userId) {
      throw new BadRequestError("User id is Required.");
    }
    // 1. Find user
    const user = await this.userRepo.findById(userId);

    if (!user) throw new NotFoundError("User not found.");

    // 2. Delete old avatar if it exists
    if (
      user.avatar?.publicId &&
      user.avatar.publicId !== env.DEFAULT_AVATAR_PUBLIC_ID
    ) {
      await cloudinary.uploader.destroy(user.avatar.publicId);
    }

    // 3. Upload new avatar
    const uploadResult = await uploadToCloudinary(file.buffer, "avatars");

    // 4. Update MongoDB
    const updatedUser = await this.userRepo.updateById(userId, {
      avatar: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });
    return updatedUser;
  }

  async deleteAvatarService(userId) {
    // 1. Find user
    const user = await this.userRepo.findById(userId);

    if (!user) throw new NotFoundError("User not found.");

    // 2. Delete old avatar if it exists
    if (
      user.avatar?.publicId &&
      user.avatar.publicId !== env.DEFAULT_AVATAR_PUBLIC_ID
    ) {
      await cloudinary.uploader.destroy(user.avatar.publicId);
    }

    const updatedUser = await this.userRepo.updateById(userId, {
      avatar: {
        publicId: env.DEFAULT_AVATAR_PUBLIC_ID,
        url: env.DEFAULT_AVATAR_URL,
      },
    });

    return updatedUser;
  }
}
