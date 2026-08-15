import PostsRepository from "../../repositories/post.repository.js";

export default class PostService{
    constructor(){
        this.postRepo = new PostsRepository()
    }

    async createPost(postData){

    }
}