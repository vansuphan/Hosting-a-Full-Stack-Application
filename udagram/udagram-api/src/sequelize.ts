import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";
import fs from "fs";
import path from 'path';

// Đọc chứng chỉ CA từ file
const ca = fs.readFileSync(path.resolve(__dirname, 'rds-combined-ca-bundle.pem')).toString();
export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  port: Number(config.port),
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: ca,
    }
  },
  dialect: "postgres",
  storage: ":memory:",
});
