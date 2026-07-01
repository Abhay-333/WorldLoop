import UserRepo from "../../repositories/user.repository.js";
import { ConflictError, NotFoundError } from "../../utils/Errors/app-errors.js";
import env from "../../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/Token.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async userExists(email) {
    return await this.userRepo.findByEmail(email); // If user exists then true else false
  }

  async registerService(payload) {
    const isExist = await this.userExists(payload.email);

    if (isExist) {
      throw new ConflictError("User already Exists.");
    }
    const newUser = await this.userRepo.createUser(payload);

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    console.log(newUser);

    return {
      newUser,
      accessToken,
      refreshToken,
    };
  }

  async loginService(payload) {
    const user = await this.userRepo.find({ email: payload.email });

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

  async refreshService(payload) {
    const user = await this.userRepo.find({ email: payload.email });

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
