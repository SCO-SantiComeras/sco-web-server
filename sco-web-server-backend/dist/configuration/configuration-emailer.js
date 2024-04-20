"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationEmailer = void 0;
const config_1 = require("@nestjs/config");
exports.configurationEmailer = (0, config_1.registerAs)("emailer", () => ({
    jwtController: process.env.EMAILER_JWT_CONTROLLER == "true",
    address: process.env.EMAILER_EMAIL,
    password: process.env.EMAILER_PASSWORD,
    service: process.env.EMAILER_SERVICE,
}));
//# sourceMappingURL=configuration-emailer.js.map