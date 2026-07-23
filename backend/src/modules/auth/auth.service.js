import crypto from "crypto";
import UserRepo from "../../repositories/user.repository.js";
import {
  AppError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizeError,
} from "../../utils/Errors/app-errors.js";
import env from "../../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/Token.js";
import sendEmail from "../../utils/sendMail.js";

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
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const newUser = await this.userRepo.createUser(payload);
    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      newUser,
      accessToken,
      refreshToken,
      verificationToken,
    };
  }

  async loginService(payload) {
    const user = await this.userRepo.findOne({ email: payload.email });

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizeError(
        "Please verify your email first. Check your mailbox",
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  }

  async refreshService(oldRefreshToken) {
    if (!oldRefreshToken) {
      throw new UnauthorizeError("Refresh Token Missing.");
    }

    const decode = verifyRefreshToken(oldRefreshToken);

    const user = await this.userRepo.findById(decode.id);
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizeError(
        "Please verify your email first. Check your mailbox",
      );
    }

    const accessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    if (user.refreshToken !== oldRefreshToken)
      throw new UnauthorizeError("Invalid refresh Token.");

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

    return true;
  }

  //   Ek aur question:
  // Password ke liye bcrypt aur token ke liye SHA-256 kyu?
  // Password → bcrypt (slow, brute-force resistant)
  // Reset token → sha256 (fast, one-time token lookup)

  async forgetPasswordService(email) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Email not found.");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    const resetLink = `${env.CLIENT_URL}/reset-password/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        html: `<h2>Reset Password</h2>
    <p>Click the button below to reset your password.</p>

    <a href="${resetLink}">
      Reset Password
    </a>

    <p>This link will expire in 5 minutes.</p>`,
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      throw AppError(error);
    }
    return true;
  }

  async resetPasswordService(resetToken, password) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // yaha pe compare hoga resetToken jo params mey mil raha hai aur crypto se naya hashedToken. agar dono equal hai toh agli condition check karo. jo ki humari resetToken Expiry time check krti hai. passwordResetExpires pichle wala expire time check karega aur check karega.
    const user = await this.userRepo.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) throw new UnauthorizeError("Token is invalid or expired");

    user.password = password;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    //Logout from all devices
    user.refreshToken = null;

    await user.save();
    return true;
  }

  async verifyEmailService(token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await this.userRepo.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) throw new UnauthorizeError("Token is invalid or expired");

    user.isEmailVerified = true;

    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return "Email verified successfully.";
  }

  async resendVerificationService(email) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new NotFoundError("Email not Found.");
    if (user.isEmailVerified)
      throw new BadRequestError("Email already Verified");

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    return { message: "Link Resent successfully.", user, verificationToken };
  }
}
