import { registerAs } from "@nestjs/config";

export const configurationExcel = registerAs("excel", () => ({
  jwtController: process.env.EXCEL_JWT_CONTROLLER == "true",
}));