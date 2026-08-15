import { StatusCodes } from "http-status-codes";
import PostService from "./post.service.js";
import { SuccessResponse } from "../../utils/SuccessResponse/SuccessResponse.js";
import { BadRequestError } from "../../utils/Errors/app-errors.js";

export default class PostController {
  constructor() {
    this.postService = new PostService();
  }

  async createPostController(req, res) {
    const postData = req.body;
    if (!postData) throw new BadRequestError("Post data is required.");
    const post = await this.postService.createPost(postData);

    return res
      .status(StatusCodes.CREATED)
      .json(
        new SuccessResponse(
          "Post created successfully.",
          post,
          StatusCodes.CREATED,
        ),
      );
  }
}
