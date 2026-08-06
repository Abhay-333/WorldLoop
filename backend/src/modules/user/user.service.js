import UserRepo from "../../repositories/user.repository.js";
import { BadRequestError } from "../../utils/Errors/app-errors.js";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async getUserProfileService(username) {
    if (!username) throw BadRequestError("Username is Required.");

    const user = await this.userRepo.findOne({ username });
    console.log(user);

    return user;
  }

  async updateProfileService(username) {
    if (!username) throw BadRequestError("Username is Required.");

    const user = await this.userRepo.findOne({ username });
    console.log(user);

    return user;
  }
}
