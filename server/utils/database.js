import { config } from "dotenv";
import { connect } from "mongoose";
import chalk from "chalk";

config();
const URI = process.env.MONGODB_URI;

const database = async () => {
  try {
    if (URI) {
      const { connection } = await connect(URI);
      if (connection) {
        console.log(chalk.cyan(`[database] ${connection.port}`));
      }
    } else {
      console.log(`Please provide mongodb uri.`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default database;
