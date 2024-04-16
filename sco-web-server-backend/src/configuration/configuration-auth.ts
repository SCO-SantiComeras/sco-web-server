import { registerAs } from "@nestjs/config";

export const configurationAuth = registerAs("auth", () => ({
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
  algorithm: process.env.AUTH_ALGORITHM,
  newUserActived: process.env.AUTH_NEW_USER_ACTIVED == "true",
}));