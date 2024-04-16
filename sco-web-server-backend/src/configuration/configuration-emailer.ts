import { registerAs } from "@nestjs/config";

export const configurationEmailer = registerAs("emailer", () => ({
  jwtController: process.env.EMAILER_JWT_CONTROLLER == "true",
  address: process.env.EMAILER_EMAIL,
  password: process.env.EMAILER_PASSWORD,
  service: process.env.EMAILER_SERVICE,
}));