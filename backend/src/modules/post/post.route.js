import { Router } from "express";
import PostController from "./post.controller.js";

const postRouter = Router();
const postController = new PostController();

postRouter.post("/",postController.createPostController.bind(postController))
export default postRouter;
