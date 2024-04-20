"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationMongo = void 0;
const config_1 = require("@nestjs/config");
exports.configurationMongo = (0, config_1.registerAs)("mongo", () => ({
    ip: process.env.MONGO_IP,
    port: parseInt(process.env.MONGO_PORT, 10 || 27017),
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    database: process.env.MONGO_DATABASE,
}));
//# sourceMappingURL=configuration-mongo.js.map