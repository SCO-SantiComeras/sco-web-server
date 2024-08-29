import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { LoggerService, MicroserviceToBackend, WebsocketAdapter } from 'sco-nestjs-utilities';
import * as fs from 'fs';

async function bootstrap() {

  const basepath: string = `${process.env.SSL_PATH}/${process.env.APP_HOST}`;
  console.log(basepath)

  let cert: any = undefined;
  if (fs.existsSync(`${basepath}/fullchain.pem`)) {
    console.log(`Cert: ${basepath}/fullchain.pem found`);
    cert = fs.readFileSync(`${basepath}/fullchain.pem`);
  }

  let key: any = undefined;
  if (fs.existsSync(`${basepath}/privkey.pem`)) {
    console.log(`Key: ${basepath}/privkey.pem found`);
    key = fs.readFileSync(`${basepath}/privkey.pem`);
  }

  const httpsEnabled: boolean = key && cert ? true : false;
  const app = await NestFactory.create(AppModule, 
    { 
      logger: new LoggerService(),
      httpsOptions: !httpsEnabled ? undefined : { key: key, cert: cert },
    }
  );

  const configService = app.get<ConfigService>(ConfigService);

  const envOrigin: string = configService.get('websocket.origin');
  let origin: string[] = [];
  if (envOrigin && envOrigin.length > 0) {
    origin = [envOrigin];

    if (envOrigin.includes(',')) {
      origin = envOrigin.split(',');
    }
  }
  
  app.enableCors({
    origin: origin && origin.length > 0 ? origin : '*',
    credentials: true,
  });

  app.useWebSocketAdapter(new WebsocketAdapter(app, configService));

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
  console.log(`[bootstrap] App started in '${httpsEnabled ? 'https' : 'http'}://${host}:${port}'`);
}
bootstrap();
