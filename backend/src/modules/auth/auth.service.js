import UserRepo from "../../repositories/user.repository";
import { ConflictError } from "../../utils/Errors/Errors";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async userExists(payload) {
    return !!(await this.userRepo.find(payload)); // If user exists then true else false
  }

  async registerService(payload) {
    const isExist = await this.userExists(payload.email);

    if (isExist) {
      throw new ConflictError("User already Exists.");
    }

    const newUser = await this.userRepo.createUser(payload);

    const accessToken = jwt.sign({ id: newUser._id }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(
      { id: newUser._id },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    return {
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      accessToken,
      refreshToken,
    };
  }
}
