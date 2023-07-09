import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

import cors from "cors";
import express, { Express } from "express";
import http from "http";

import { AppDataSource } from "./data-source";
import { ROUTER } from "./routes";

const app: Express = express();

const port: number = parseInt(process.env.PORT);
const base: string = process.env.BASE;
const mode: string = process.env.MODE;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply all routes specified in routes.ts
for (const route of ROUTER) {
  app.use("/" + base + "/" + route.path, route.middleware, route.handler);
}

app.set("port", port || 8001);

app.listen(port, async () => {
  // Connect to database
  try {
    console.info(`Me Running in mode ${mode}`);
    await AppDataSource.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.info(`Server started at the port ${port}`);
});
