import dbConfig from "../config/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.username!,
  dbConfig.password!,
  dbConfig
);
