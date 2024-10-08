import { registerAs } from "@nestjs/config";

export const configurationPopulate = registerAs("populate", () => ({
  populate: process.env.POPULATE_ENABLED == "true",
  publicUser: process.env.POPULATE_PUBLIC_USER == "true",
}));