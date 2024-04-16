import { registerAs } from "@nestjs/config";

export const configurationPopulate = registerAs("populate", () => ({
  populate: process.env.POPULATE_POPULATE == "true",
}));