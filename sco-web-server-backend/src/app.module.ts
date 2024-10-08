
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { configurationApp } from "./configuration/configuration-app";
import { configurationAuth } from "./configuration/configuration-auth";
import { configurationEmailer } from "./configuration/configuration-emailer";
import { configurationMongo } from "./configuration/configuration-mongo";
import { configurationWebSockets } from './configuration/configuration-webSockets';
import { configurationExcel } from "./configuration/configuration-excel";
import { configurationPermissions } from "./configuration/configuration-permissions";
import { configurationRoles } from "./configuration/configuration-roles";
import { configurationUsers } from "./configuration/configuration-users";
import { configurationPopulate } from "./configuration/configuration-populate";

import { LoggerModule } from 'sco-nestjs-utilities/logger/logger.module';
import { PaginationModule } from 'sco-nestjs-utilities/pagination/pagination.module';
import { SharedModule } from 'sco-nestjs-utilities/shared/shared.module';
import { MongoDbModule } from 'sco-nestjs-utilities/mongo-db/mongo-db.module';
import { WebsocketModule } from 'sco-nestjs-utilities/websocket/websocket.module';
import { AuthModule } from 'sco-nestjs-utilities/auth/auth.module';
import { EmailerModule } from 'sco-nestjs-utilities/emailer/emailer.module';
import { ExcelModule } from 'sco-nestjs-utilities/excel/excel.module';
import { PermissionsModule } from 'sco-nestjs-utilities/permissions/permissions.module';
import { RolesModule } from 'sco-nestjs-utilities/roles/roles.module';
import { UsersModule } from 'sco-nestjs-utilities/users/users.module';
import { PopulateModule } from 'sco-nestjs-utilities/populate/populate.module';
import { PublicMiddleware } from "sco-nestjs-utilities/middlewares/public.middleware";
import { NodeServerModule } from "./modules/node-server/node-server.module";
import { configurationNodeServer } from "./configuration/configuration-nodeServer";
import { BackendPopulateModule } from "./modules/backend-populate/backend-populate.module";

require("dotenv").config();

export const JWT_CONTROLLER_ON: boolean = true;
export const JWT_CONTROLLER_OFF: boolean = false;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        configurationApp,
        configurationAuth, 
        configurationEmailer,
        configurationExcel,
        configurationMongo,
        configurationPermissions,
        configurationPopulate,
        configurationRoles,
        configurationUsers,
        configurationWebSockets,
        configurationNodeServer,
      ],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),

    /* Library Imports */
    LoggerModule,
    PaginationModule,
    SharedModule,
    MongoDbModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ip: configService.get('mongo.ip'),
          port: configService.get('mongo.port'),
          database: configService.get('mongo.database'),
          user: configService.get('mongo.user'),
          pass: configService.get('mongo.pass'),
        };
      },
      inject: [ConfigService],
    }),
    WebsocketModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          port: configService.get('websocket.port'),
          origin: configService.get('websocket.origin'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('auth.secret'),
          signOptions: {
            expiresIn: configService.get('auth.expiresIn'),
          },
          algorithm: configService.get('auth.algorithm'),
          newUserActived: configService.get('auth.newUserActived'),
        };
      },
      inject: [ConfigService],
    }),
    EmailerModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            jwtController: configService.get('emailer.jwtController'),
            sending_Email_Address: configService.get('emailer.address'),
            sending_Email_Password: configService.get('emailer.password'),
            service: configService.get('emailer.service'),
          };
        },
        inject: [ConfigService],
      },
      JWT_CONTROLLER_OFF,
    ),
    ExcelModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            jwtController: configService.get('excel.jwtController'),
          };
        },
        inject: [ConfigService],
      },
      JWT_CONTROLLER_OFF,
    ),
    PermissionsModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            jwtController: configService.get('permissions.jwtController'),
          };
        },
        inject: [ConfigService],
      },
      JWT_CONTROLLER_OFF,
    ),
    RolesModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            jwtController: configService.get('roles.jwtController'),
          };
        },
        inject: [ConfigService],
      },
      JWT_CONTROLLER_OFF,
    ),
    UsersModule.registerAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            jwtController: configService.get('users.jwtController'),
            newUserActived: configService.get('users.newUserActived'),
          };
        },
        inject: [ConfigService],
      },
      JWT_CONTROLLER_OFF,
    ),
    PopulateModule.registerAsync( // Always Last Module On Load
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            populate: configService.get('populate.populate'),
          };
        },
        inject: [ConfigService],
      },
    ),

    /* Backend Own Imports */
    NodeServerModule,
    BackendPopulateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PublicMiddleware).forRoutes("*");
  }
}