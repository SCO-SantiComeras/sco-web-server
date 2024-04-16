import { registerAs } from "@nestjs/config";

export const configurationApp = registerAs("app", () => ({
  port: parseInt(process.env.APP_PORT, 10 || 8000),
  production: process.env.APP_PRODUCTION == "true",
  swagger: process.env.APP_SWAGGER == "true",
  swaggerRoute: process.env.APP_SWAGGER_ROUTE,
  host: process.env.APP_HOST,
}));