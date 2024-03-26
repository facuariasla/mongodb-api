import "dotenv/config";
import express, { Application } from "express";
import morgan from "morgan";
import { mongoDbConnection } from "./database/mongodb/mongo";
import CoreRoutes from "../core/routes/index.routes";
import { ServerConfigurations } from "../middleware/server.configuration.middleware";
import { AuthenticationMiddleware } from "../middleware/authentication.middleware";
import cors from "cors";

export class Server {
  public app: Application;
  public port: number;

  constructor(port: number, app: Application) {
    this.port = port;
    this.app = app;
  }
  static init(port: number, app: Application) {
    return new Server(port, app);
  }
  public static createServer(): Application {
    const app = express();
    app.set("view engine", "pug");
    Server.config(app);
    return app;
  }

  public static config(app: Application): void {
    app.use(cors({
      // Customize CORS settings based on your application's requirements:
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      optionsSuccessStatus: 200,
    }));
    app.use(AuthenticationMiddleware.accessControl);
    app.use(ServerConfigurations.addHeaders);
    // app.use(express.json({ limit: 10485760 }));
    // app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: "20mb" }));
    app.use(express.urlencoded({ limit: "20mb", extended: true }));

    app.use(morgan("dev"));
    app.use("/api/v1", CoreRoutes);
    app.use(ServerConfigurations.handleErrorMiddelware);
  }
  async start(callback: Function) {
    Server.config(this.app);
    await mongoDbConnection();
    console.log(`🌱 MongoDB ON`);
    return this.app.listen(this.port, callback());
  }
}
