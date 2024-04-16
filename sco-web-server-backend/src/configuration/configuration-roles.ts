import { registerAs } from "@nestjs/config";

export const configurationRoles = registerAs("roles", () => ({
  jwtController: process.env.ROLES_JWT_CONTROLLER == "true",
}));