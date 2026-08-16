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

  async findPostsByUsername({ userId, cursor, limit }) {
    const query = {
      author: userId,
      isArchived: false,
    };

    if (cursor) {
      query._id = {
        $lt: cursor,
      };
    }
    const posts = await PostModel.find(query)
      .sort({ _id: -1 }) // this means descendind order
      .limit(limit + 1) //This is done to determine whether another page exists.
      .lean();

    const hasNextPage = posts.length > limit;

    if (hasNextPage) {  
      posts.pop();  //Remove the extra post
    }

    const nextCursor = hasNextPage
      ? posts[posts.length - 1]._id.toString()
      : null;

    return { posts, nextCursor, hasNextPage };
  }
}
