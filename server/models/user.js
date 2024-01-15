import { config } from "dotenv";
import chalk from "chalk";
import { Schema, model } from "mongoose";
import pkg from "jsonwebtoken";

config();
const SECRET = process.env.JWT_SECRET;
const { sign } = pkg;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  subscribed: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

userSchema.methods.genJWT = function () {
  try {
    return sign(
      {
        id: this._id,
        email: this.email,
      },
      SECRET,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(chalk.magenta(`[genJWT] ${error.message}`));
  }
};

const User = model("User", userSchema);

export default User;
