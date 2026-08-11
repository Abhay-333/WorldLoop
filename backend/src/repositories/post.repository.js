import PostModel from "../models/post.model.js";

export default class PostsRepository {
  async findByAuthorId(userId) {
    return await PostModel.find({
      author: userId,
      isArchived: false,
    })
      .sort({ createdAt: -1 })
      .populate("author", "username fullName avatar");
  }
}
