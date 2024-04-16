import { registerAs } from "@nestjs/config";

export const configurationMicroserviceConnection = registerAs("mc", () => ({
  enabled: process.env.MC_ENABLED == "true",
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT, 10 || 8002),
}));