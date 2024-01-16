import { config } from "dotenv";
import chalk from "chalk";
import pkg from "jsonwebtoken";
import User from "../models/user.js";

config();
const SECRET = process.env.JWT_SECRET;
const { verify } = pkg;

const isAuthorized = async (req, res, next) => {
  try {
    const authorization = await req.header("Authorization");
    const token = authorization.split(" ")[1];
    const verfiedToken = await verify(token, SECRET);
    const authorizedUser = await User.findById(verfiedToken.id).select({
      password: 0,
    });

    req.user = authorizedUser;
    req.id = authorizedUser._id;
    req.token = token;
    next();
  } catch (error) {
    console.log(chalk.magenta(`[isAuthorized] ${error.message}`));
  }
};

export default isAuthorized;
