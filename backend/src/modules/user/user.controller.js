export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserController(req, res) {
    const { username } = req;
    const { user } = await this.userService.getUserService(username);

    console.log(user);
  }
}
