import { config } from "dotenv";
import chalk from "chalk";
import User from "../models/user.js";
import pkg from "bcryptjs";

config();
const { genSaltSync, hashSync, compareSync } = pkg;
const SALT = genSaltSync(Number(process.env.SALT));

const login = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const user = await User.findOne({ username: username });
    const isAuthorized = compareSync(password, user.password);
    if (user && isAuthorized) {
      const token = await user.genJWT();
      res.status(200).json({ token });
    } else {
      res.status(404).json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[login] ${error.message}`));
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, subscribed } = await req.body;
    if (password.length < 8) {
      res.status(400).json({ message: "Password must be 8 charecters long" });
    } else {
      const hashedPassword = await hashSync(password, SALT);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        subscribed,
      });
      const savedUser = await user.save();
      console.log(chalk.cyan(`— registered ${savedUser._id}`));
      res.status(200).json(savedUser);
    }
  } catch (error) {
    console.log(chalk.magenta(`[register] ${error.message}`));
  }
};

export { login, register };
