"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationApp = void 0;
const config_1 = require("@nestjs/config");
exports.configurationApp = (0, config_1.registerAs)("app", () => ({
    port: parseInt(process.env.APP_PORT, 10 || 8000),
    production: process.env.APP_PRODUCTION == "true",
    swagger: process.env.APP_SWAGGER == "true",
    swaggerRoute: process.env.APP_SWAGGER_ROUTE,
    host: process.env.APP_HOST,
}));
//# sourceMappingURL=configuration-app.js.map