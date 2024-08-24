import { Options } from "sequelize";
import dotenv from "dotenv";

const dbConfig: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  timezone: 'utc',
};

export default dbConfig;
