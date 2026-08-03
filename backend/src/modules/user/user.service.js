import UserRepo from "../../repositories/user.repository";
import { BadRequestError } from "../../utils/Errors/app-errors";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async getUserService(username) {
    if (!username) throw BadRequestError("Username is Required.");

    const user = await this.userRepo.findOne(username);
    console.log(user);
    
    return user;
  }
}
