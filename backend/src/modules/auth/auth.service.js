import UserRepo from "../../repositories/user.repository";
import { ConflictError, NotFoundError } from "../../utils/Errors/Errors";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/Token.js";

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

    const accessToken = generateAccessToken(newUser._id);

    const refreshToken = generateRefreshToken(newUser._id);

    return {
      newUser,
      accessToken,
      refreshToken,
    };
  }

  async loginService(payload) {
    const user = await this.userRepo.find(payload.email);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
