"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.JWT_CONTROLLER_OFF = exports.JWT_CONTROLLER_ON = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_app_1 = require("./configuration/configuration-app");
const configuration_auth_1 = require("./configuration/configuration-auth");
const configuration_emailer_1 = require("./configuration/configuration-emailer");
const configuration_mongo_1 = require("./configuration/configuration-mongo");
const configuration_webSockets_1 = require("./configuration/configuration-webSockets");
const configuration_excel_1 = require("./configuration/configuration-excel");
const configuration_permissions_1 = require("./configuration/configuration-permissions");
const configuration_roles_1 = require("./configuration/configuration-roles");
const configuration_users_1 = require("./configuration/configuration-users");
const configuration_populate_1 = require("./configuration/configuration-populate");
const logger_module_1 = require("sco-nestjs-utilities/logger/logger.module");
const pagination_module_1 = require("sco-nestjs-utilities/pagination/pagination.module");
const shared_module_1 = require("sco-nestjs-utilities/shared/shared.module");
const mongo_db_module_1 = require("sco-nestjs-utilities/mongo-db/mongo-db.module");
const websocket_module_1 = require("sco-nestjs-utilities/websocket/websocket.module");
const auth_module_1 = require("sco-nestjs-utilities/auth/auth.module");
const emailer_module_1 = require("sco-nestjs-utilities/emailer/emailer.module");
const excel_module_1 = require("sco-nestjs-utilities/excel/excel.module");
const permissions_module_1 = require("sco-nestjs-utilities/permissions/permissions.module");
const roles_module_1 = require("sco-nestjs-utilities/roles/roles.module");
const users_module_1 = require("sco-nestjs-utilities/users/users.module");
const populate_module_1 = require("sco-nestjs-utilities/populate/populate.module");
const public_middleware_1 = require("sco-nestjs-utilities/middlewares/public.middleware");
const node_server_module_1 = require("./modules/node-server/node-server.module");
const configuration_nodeServer_1 = require("./configuration/configuration-nodeServer");
const backend_populate_module_1 = require("./modules/backend-populate/backend-populate.module");
require("dotenv").config();
exports.JWT_CONTROLLER_ON = true;
exports.JWT_CONTROLLER_OFF = false;
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(public_middleware_1.PublicMiddleware).forRoutes("*");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [
                    configuration_app_1.configurationApp,
                    configuration_auth_1.configurationAuth,
                    configuration_emailer_1.configurationEmailer,
                    configuration_excel_1.configurationExcel,
                    configuration_mongo_1.configurationMongo,
                    configuration_permissions_1.configurationPermissions,
                    configuration_populate_1.configurationPopulate,
                    configuration_roles_1.configurationRoles,
                    configuration_users_1.configurationUsers,
                    configuration_webSockets_1.configurationWebSockets,
                    configuration_nodeServer_1.configurationNodeServer,
                ],
                envFilePath: `./env/${process.env.NODE_ENV}.env`,
                isGlobal: true,
            }),
            logger_module_1.LoggerModule,
            pagination_module_1.PaginationModule,
            shared_module_1.SharedModule,
            mongo_db_module_1.MongoDbModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        ip: configService.get('mongo.ip'),
                        port: configService.get('mongo.port'),
                        database: configService.get('mongo.database'),
                        user: configService.get('mongo.user'),
                        pass: configService.get('mongo.pass'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            websocket_module_1.WebsocketModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        port: configService.get('ws.port'),
                        origin: configService.get('ws.origin'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        secret: configService.get('auth.secret'),
                        signOptions: {
                            expiresIn: configService.get('auth.expiresIn'),
                        },
                        algorithm: configService.get('auth.algorithm'),
                        newUserActived: configService.get('auth.newUserActived'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            emailer_module_1.EmailerModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        jwtController: configService.get('emailer.jwtController'),
                        sending_Email_Address: configService.get('emailer.address'),
                        sending_Email_Password: configService.get('emailer.password'),
                        service: configService.get('emailer.service'),
                    };
                },
                inject: [config_1.ConfigService],
            }, exports.JWT_CONTROLLER_OFF),
            excel_module_1.ExcelModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        jwtController: configService.get('excel.jwtController'),
                    };
                },
                inject: [config_1.ConfigService],
            }, exports.JWT_CONTROLLER_OFF),
            permissions_module_1.PermissionsModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        jwtController: configService.get('permissions.jwtController'),
                    };
                },
                inject: [config_1.ConfigService],
            }, exports.JWT_CONTROLLER_OFF),
            roles_module_1.RolesModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        jwtController: configService.get('roles.jwtController'),
                    };
                },
                inject: [config_1.ConfigService],
            }, exports.JWT_CONTROLLER_OFF),
            users_module_1.UsersModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        jwtController: configService.get('users.jwtController'),
                        newUserActived: configService.get('users.newUserActived'),
                    };
                },
                inject: [config_1.ConfigService],
            }, exports.JWT_CONTROLLER_OFF),
            populate_module_1.PopulateModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        populate: configService.get('populate.populate'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            node_server_module_1.NodeServerModule,
            backend_populate_module_1.BackendPopulateModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map