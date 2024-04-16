import { registerAs } from "@nestjs/config";

export const configurationSftp = registerAs("sftp", () => ({
  jwtController:  process.env.SFTP_JWT_CONTROLLER == "true",
  host: process.env.SFTP_HOST,
  port: parseInt(process.env.SFTP_PORT, 10 || 22),
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD,
}));