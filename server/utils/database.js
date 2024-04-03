import chalk from "chalk";
import { config } from "dotenv";
import { connect } from "mongoose";

config();
const URI = process.env.MONGODB_URI;

const database = async () => {
  try {
    const { connection } = await connect(URI);
    console.log(chalk.cyan(`[database] ${connection.port}`));
  } catch ({ message }) {
    console.log(chalk.magenta(`[database] ${message}`));
  }
};

export default database;
