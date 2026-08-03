import UserService from "./user.service.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserController(req, res) {
    const { username } = req.params;
    console.log(username)
    const { user } = await this.userService.getUserService(username);

    console.log(user);
  }
}
