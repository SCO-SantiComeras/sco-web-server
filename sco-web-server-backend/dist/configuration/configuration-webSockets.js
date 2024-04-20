"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationWebSockets = void 0;
const config_1 = require("@nestjs/config");
exports.configurationWebSockets = (0, config_1.registerAs)("ws", () => ({
    port: parseInt(process.env.WEBSOCKETS_PORT, 10 || 8001),
    origin: process.env.WEBSOCKETS_ORIGIN,
}));
//# sourceMappingURL=configuration-webSockets.js.map