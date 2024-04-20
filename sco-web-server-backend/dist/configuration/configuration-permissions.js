"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationPermissions = void 0;
const config_1 = require("@nestjs/config");
exports.configurationPermissions = (0, config_1.registerAs)("permissions", () => ({
    jwtController: process.env.PERMISSIONS_JWT_CONTROLLER == "true",
}));
//# sourceMappingURL=configuration-permissions.js.map