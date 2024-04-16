import { ConfigService } from '@nestjs/config';
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LoggerService, MicroserviceToBackend, WebsocketAdapter } from 'sco-nestjs-utilities';
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {

  const domain: string | null = 'demo.com' || ''; // Ejemplo de dominio

  let htppsEnable: boolean = false;
  
  let cert: any = undefined;
  if (fs.existsSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`)) {
    cert = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
  }

  let key: any = undefined;
  if (fs.existsSync(`/etc/letsencrypt/live/${domain}/privkey.pem`)) {
    key = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
  }

  if (cert && key) {
    htppsEnable = true;
  }

  const app = await NestFactory.create(AppModule, 
    { 
      logger: new LoggerService(),
      httpsOptions: htppsEnable ? { cert, key } : undefined,
    }
  );

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: !configService.get("ws.origin")
      ? []
      : configService.get("ws.origin").split(','),
    credentials: true,
  });

  app.useWebSocketAdapter(
    new WebsocketAdapter(app, {
      port: configService.get("ws.port"),
      origin: !configService.get("ws.origin")
        ? []
        : configService.get("ws.origin").split(','),
    })
  );

  const swagger: boolean = configService.get('app.swagger');
  const swaggerRoute: string = configService.get('app.swaggerRoute');
  if (swagger) {
    const options = new DocumentBuilder()
      .setTitle('SCO Nestjs Utilities Base')
      .setDescription('SCO Nestjs Utilities Base')
      .setVersion('1.0')
      .addTag('SCO')
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth"
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerRoute, app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = Object.values(validationErrors[0].constraints).join(',');
        const splitErrors: string[] = errors.split(',');
        throw new HttpException(splitErrors[splitErrors.length-1], HttpStatus.BAD_REQUEST);
      },
    }),
  );

  if (configService.get("mc.enabled")) {
    app.connectMicroservice(new MicroserviceToBackend(configService.get("mc.host"), configService.get("mc.port")));
    await app.startAllMicroservices();
  }
 
  const port: number = configService.get("app.port");
  await app.listen(port);

  const host: string = configService.get("app.host");
  if (swagger) console.log(`[bootstrap] Swagger started in url '${htppsEnable ? 'https' : 'http'}://${host}:${port}/${swaggerRoute}'`);
  console.log(`[bootstrap] App started in '${htppsEnable ? 'https' : 'http'}://${host}:${port}'`);
  console.log(`[bootstrap] Environment loaded is: ${configService.get('app.production') ? 'PROD' : 'DEV'}`);
}
bootstrap();
