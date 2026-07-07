import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    fullName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },

    avatar: {
      publicId: String,
      url: String,
    },

    coverImage: {
      publicId: String,
      url: String,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    refreshToken: {
      type: String,
      default: null,
      // select: false,
    },

    passwordResetToken: {
      type: String,
      default: null,
      // select: false,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
      // select: false,
    },

    passwordResetToken: {
      type: String,
      default: null,
      // select: false,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
      // select: false,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: { type: String, default: null },
    emailVerificationExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
