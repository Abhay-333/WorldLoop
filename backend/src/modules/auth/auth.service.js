import UserRepo from "../../repositories/user.repository";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async UserExist(user) {
    const user = await this.userRepo.find();
    if (user) return true;
    return false;
  }

  async registerService() {
    const isExist = this.UserExist;

    if (!isExist) {
        // add new error class here
    }
  }
}
