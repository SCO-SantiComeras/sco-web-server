import { registerAs } from "@nestjs/config";

export const configurationNodeServer = registerAs("server", () => ({
  rootPath: process.env.NODE_SERVER_ROOT_PATH,
  serverServerFolder: process.env.NODE_SERVER_SERVER_FOLDER,
  serverAppFolder: process.env.NODE_SERVER_APP_FOLDER,
}));