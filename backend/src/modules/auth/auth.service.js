import UserRepo from "../../repositories/user.repository.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizeError,
} from "../../utils/Errors/app-errors.js";
import env from "../../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
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

  async refreshService(oldRefreshToken) {
    if (!oldRefreshToken) {
      throw new UnauthorizeError("Refresh Token Missing.");
    }

    const decode = verifyRefreshToken(oldRefreshToken);

    const user = await this.userRepo.findById(decode._id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user.refreshToken !== oldRefreshToken)
      throw new UnauthorizeError("Invalid refresh Token.");

    const accessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logoutService(refreshToken) {
    if (!refreshToken) {
      return false;
    }

    const user = await this.userRepo.findUserByToken(refreshToken);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    user.refreshToken = null;

    await user.save();

    return true
  }
}
