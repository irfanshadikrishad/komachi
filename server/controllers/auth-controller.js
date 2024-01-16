import { config } from "dotenv";
import chalk from "chalk";
import User from "../models/user.js";
import pkg from "bcryptjs";

config();
const { genSaltSync, hashSync, compareSync } = pkg;
const SALT = genSaltSync(Number(process.env.SALT));

const login = async (req, res) => {
  const { username, password } = await req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    const isAuthorized = compareSync(password, user.password);
    if (isAuthorized) {
      const token = await user.genJWT();
      res.status(200).json({ token });
    } else {
      res.status(404).json({ message: "Invalid Credentials! / A" });
    }
  } else {
    res.status(404).json({ message: "Invalid Credentials! / U" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, subscribed } = await req.body;
    if (password.length < 8) {
      res.status(400).json({ message: "Password must be 8 charecters long" });
    } else {
      const isUserNameTaken = await User.findOne({ username: username });
      const isEmailTaken = await User.findOne({ email: email });

      if (isEmailTaken || isUserNameTaken) {
        res.status(400).json({ message: "username or email already taken!" });
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
        const token = savedUser.genJWT();
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    console.log(chalk.magenta(`[register] ${error.message}`));
  }
};

const authorizedUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(chalk.magenta(`[authorizedUser] ${error.message}`));
  }
};

export { login, register, authorizedUser };
