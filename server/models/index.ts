import { Sequelize } from "sequelize";
const dbConfig = require("../config/config.js");

export const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.username!,
  dbConfig.password!,
  dbConfig
);
