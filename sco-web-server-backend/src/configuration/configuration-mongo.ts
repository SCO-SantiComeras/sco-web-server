import { registerAs } from "@nestjs/config";

export const configurationMongo = registerAs("mongo", () => ({
  ip: process.env.MONGO_IP,
  port: parseInt(process.env.MONGO_PORT, 10 || 27017),
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  database: process.env.MONGO_DATABASE,
}));