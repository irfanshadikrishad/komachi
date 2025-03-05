import { createClient } from "redis"

if (!process.env.REDIS_URL) {
  console.error("[REDIS] REDIS_URL is missing in environment variables.")
  process.exit(1)
}

const client = createClient({
  url: process.env.REDIS_URL,
})

client.on("error", (error) => {
  console.error(`[REDIS] ${error}`)
})
client.on("connect", () => {
  console.warn("[REDIS] Attempting to connect...")
})

client.on("ready", () => {
  console.warn("[REDIS] Connected successfully!")
})

client.on("end", () => {
  console.warn("[REDIS] Connection closed.")
})

class redis {
  static async Connect() {
    if (!client.isOpen) {
      await client.connect()
    }
  }
}

export { client, redis }
