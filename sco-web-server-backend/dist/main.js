"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
const common_1 = require("@nestjs/common");
const fs = require("fs");
async function bootstrap() {
    const domain = 'demo.com' || '';
    let htppsEnable = false;
    let cert = undefined;
    if (fs.existsSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`)) {
        cert = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
    }
    let key = undefined;
    if (fs.existsSync(`/etc/letsencrypt/live/${domain}/privkey.pem`)) {
        key = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
    }
    if (cert && key) {
        htppsEnable = true;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new sco_nestjs_utilities_1.LoggerService(),
        httpsOptions: htppsEnable ? { cert, key } : undefined,
    });
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: !configService.get("ws.origin")
            ? []
            : configService.get("ws.origin").split(','),
        credentials: true,
    });
    app.useWebSocketAdapter(new sco_nestjs_utilities_1.WebsocketAdapter(app, {
        port: configService.get("ws.port"),
        origin: !configService.get("ws.origin")
            ? []
            : configService.get("ws.origin").split(','),
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
            const errors = Object.values(validationErrors[0].constraints).join(',');
            const splitErrors = errors.split(',');
            throw new common_1.HttpException(splitErrors[splitErrors.length - 1], common_1.HttpStatus.BAD_REQUEST);
        },
    }));
    if (configService.get("mc.enabled")) {
        app.connectMicroservice(new sco_nestjs_utilities_1.MicroserviceToBackend(configService.get("mc.host"), configService.get("mc.port")));
        await app.startAllMicroservices();
    }
    const port = configService.get("app.port");
    await app.listen(port);
    const host = configService.get("app.host");
    console.log(`[bootstrap] App started in '${htppsEnable ? 'https' : 'http'}://${host}:${port}'`);
    console.log(`[bootstrap] Environment loaded is: ${configService.get('app.production') ? 'PROD' : 'DEV'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map