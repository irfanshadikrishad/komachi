import chalk from "chalk"
import { connect, connection } from "mongoose"

const URI = process.env.MONGODB_URI

const database = async () => {
  try {
    if (URI && !connection.readyState) {
      const { connection } = await connect(URI)
      if (connection) {
        console.log(chalk.cyan(`[database] ${connection.port}`))
      }
    } else if (!URI) {
      console.error(`Please provide mongodb uri.`)
    } else {
      console.log(chalk.cyan("[database] Already connected"))
    }
  } catch (error) {
    console.log(error)
  }
}

export { database }
