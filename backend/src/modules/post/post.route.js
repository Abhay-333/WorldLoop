import { Router } from "express";
import PostController from "./post.controller";

const postRouter = Router();
const postController = new PostController();

postRouter.post("/",postController)
export default postRouter;
