import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import webPushSettings from "../web-push/config.js";
import subscribe from "../routes/subscribe.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.webPush();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(path.dirname(__filename));

    this.app.use(express.static(path.join(__dirname, "client")));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/subscribe", subscribe);
  }

  webPush() {
    webPushSettings();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
