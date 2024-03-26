import 'dotenv/config'
import { Server } from "./infraestructure/server";
export const app = Server.createServer();
export const server = Server.init(parseInt(process.env.PORT as string), app);

server.start(async () => {
  console.log(`🐦 Server listening on port ${server.port}`);
});
