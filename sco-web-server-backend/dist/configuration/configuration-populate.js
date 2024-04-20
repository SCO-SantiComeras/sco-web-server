"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationPopulate = void 0;
const config_1 = require("@nestjs/config");
exports.configurationPopulate = (0, config_1.registerAs)("populate", () => ({
    populate: process.env.POPULATE_POPULATE == "true",
    publicUser: process.env.POPULATE_PUBLIC_USER == "true",
}));
//# sourceMappingURL=configuration-populate.js.map