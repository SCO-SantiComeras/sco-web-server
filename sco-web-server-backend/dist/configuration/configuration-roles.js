"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationRoles = void 0;
const config_1 = require("@nestjs/config");
exports.configurationRoles = (0, config_1.registerAs)("roles", () => ({
    jwtController: process.env.ROLES_JWT_CONTROLLER == "true",
}));
//# sourceMappingURL=configuration-roles.js.map