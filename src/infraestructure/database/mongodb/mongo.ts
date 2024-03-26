import "dotenv/config";
import { MongoClient } from "mongodb";
// URL de conexión a tu base de datos MongoDB
const URL: string = process.env.MONGODB_URL as string;
const DB_NAME: string = process.env.MONGODB_DATABASE as string;
const client: MongoClient = new MongoClient(URL);

export async function mongoDbConnection(): Promise<void> {
  try {
    await client.connect();
  } catch (error) {
    // Manejar el error
    console.error(`❌ Error trying to connect to MongoDB: ${error}`);
    throw `❌ Error trying to connect to MongoDB: ${error}`;
  }
}
mongoDbConnection();
const mongoDB = client.db(DB_NAME);

export default mongoDB;
