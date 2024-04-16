import { registerAs } from "@nestjs/config";

export const configurationNodeServer = registerAs("server", () => ({
  serverPath: process.env.NODE_SERVER_PATH,
  serverRootFolder: process.env.NODE_SERVER_ROOT_FOLDER,
}));