"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationExcel = void 0;
const config_1 = require("@nestjs/config");
exports.configurationExcel = (0, config_1.registerAs)("excel", () => ({
    jwtController: process.env.EXCEL_JWT_CONTROLLER == "true",
}));
//# sourceMappingURL=configuration-excel.js.map