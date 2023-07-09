import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Log } from "./entity/log";

const port: number = parseInt(process.env.DB_PORT);
const host: string = process.env.HOST;
const username: string = process.env.USERNAME;
const password: string = process.env.PASSWORD;
const db_name: string = process.env.DATABASE;

console.info(`Port ${port}`);
console.info(`host ${host}`);
console.info(`username ${username}`);
console.info(`password ${password}`);
console.info(`db_name ${db_name}`);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: host,
  port: port,
  username: username,
  password: password,
  database: db_name,
  synchronize: true,
  logging: false,
  entities: [Log],
  migrations: [],
  subscribers: [],
});
