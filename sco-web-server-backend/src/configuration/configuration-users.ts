import { registerAs } from "@nestjs/config";

export const configurationUsers = registerAs("users", () => ({
  jwtController: process.env.USERS_JWT_CONTROLLER == "true",
  newUserActived: process.env.USERS_NEW_USER_ACTIVED == "true",
}));