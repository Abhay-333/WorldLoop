import UserRepo from "../../repositories/user.repository.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../utils/Errors/app-errors.js";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async getUserProfileService(username) {
    if (!username) throw BadRequestError("Username is Required.");
    const user = await this.userRepo.findOne({ username });
    return user;
  }

  async updateProfileService(userId, profileData) {
    const allowedFields = ["displayName", "bio", "website", "location"];
    const updates = {};

    for (const field of allowedFields) {
      if (profileData[field] !== undefined) {
        updates[field] = profileData[field];
      }
    }

    const user = await this.userRepo.updateById(userId);
    console.log(user);

    if (!user) throw new NotFoundError("User not found.");

    return user;
  }

  async getUserPostsService(username) {
    if (!username) throw BadRequestError("Username is Required.");

    const user = await this.userRepo.findOne({ username });
    console.log(user);

    return user;
  }
}
