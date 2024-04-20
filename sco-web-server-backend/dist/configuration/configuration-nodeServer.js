"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationNodeServer = void 0;
const config_1 = require("@nestjs/config");
exports.configurationNodeServer = (0, config_1.registerAs)("server", () => ({
    rootPath: process.env.NODE_SERVER_ROOT_PATH,
    serverServerFolder: process.env.NODE_SERVER_SERVER_FOLDER,
}));
//# sourceMappingURL=configuration-nodeServer.js.map