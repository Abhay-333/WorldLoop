import UserModel from "../models/user.model.js";
import { NotFoundError, UnauthorizeError } from "../utils/Errors/app-errors.js";
import { verifyAccessToken } from "../utils/Token.js";

const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;
  // console.log(req.cookies);
  if (!accessToken) throw new UnauthorizeError("Token is missing.");

  const decode = verifyAccessToken(accessToken);

  const user = await UserModel.findById(decode.id);
  if (!user) throw new NotFoundError("User not Found.");

  req.user = user;
  next();
};

export default authenticate;
