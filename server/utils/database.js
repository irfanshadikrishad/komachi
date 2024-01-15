import chalk from "chalk";
import { config } from "dotenv";
import { connect } from "mongoose";

config();

const database = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log(chalk.cyan(`[database] connected`));
  } catch (error) {
    console.log(chalk.magenta(`[database] ${error.message}`));
  }
};

export default database;
