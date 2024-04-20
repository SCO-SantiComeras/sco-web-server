"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationAuth = void 0;
const config_1 = require("@nestjs/config");
exports.configurationAuth = (0, config_1.registerAs)("auth", () => ({
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.AUTH_EXPIRES_IN,
    algorithm: process.env.AUTH_ALGORITHM,
    newUserActived: process.env.AUTH_NEW_USER_ACTIVED == "true",
}));
//# sourceMappingURL=configuration-auth.js.map