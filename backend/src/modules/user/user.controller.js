export default class userController {
  constructor() {
    this.userService = new UserService();
  }

  async getUser(req, res) {
    const { userId } = req;
    const { user } = await this.userService.getUserService(userId);

    console.log(user);
  }
}
