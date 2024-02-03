import chalk from "chalk";
import { config } from "dotenv";
import { connect } from "mongoose";

config();
const URI = process.env.MONGODB_URI;

const database = async () => {
  try {
    const connection = await connect(URI);
    console.log(chalk.cyan(`[database] ${connection.connection.port}`));
  } catch (error) {
    console.log(chalk.magenta(`[database] ${error.message}`));
  }
};

export default database;
