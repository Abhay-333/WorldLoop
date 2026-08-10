import UserModel from "../models/user.model.js";

export default class UserRepo {
  async createUser(payload) {
    return await UserModel.create(payload);
  }
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
  async findById(id) {
    return await UserModel.findById(id);
  }
  async findOne(payload) {
    return await UserModel.findOne(payload);
  }
  async findUserByToken(token) {
    return await UserModel.findOne({
      refreshToken: token,
    });
  }
  async updateById(userId, updates) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-password -refreshToken");
  }
  
  async find(userId, updates) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-password -refreshToken");
  }
}
