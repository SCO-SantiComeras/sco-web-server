import { registerAs } from "@nestjs/config";

export const configurationPermissions = registerAs("permissions", () => ({
  jwtController: process.env.PERMISSIONS_JWT_CONTROLLER == "true",
}));