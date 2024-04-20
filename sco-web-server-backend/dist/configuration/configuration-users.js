"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationUsers = void 0;
const config_1 = require("@nestjs/config");
exports.configurationUsers = (0, config_1.registerAs)("users", () => ({
    jwtController: process.env.USERS_JWT_CONTROLLER == "true",
    newUserActived: process.env.USERS_NEW_USER_ACTIVED == "true",
}));
//# sourceMappingURL=configuration-users.js.map