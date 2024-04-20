"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeServerModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
const node_server_controller_1 = require("./node-server.controller");
const node_server_service_1 = require("./node-server.service");
let NodeServerModule = class NodeServerModule {
};
NodeServerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            sco_nestjs_utilities_1.SharedModule,
        ],
        controllers: [
            node_server_controller_1.NodeServerController,
        ],
        providers: [
            node_server_service_1.NodeServerService,
        ],
        exports: [
            node_server_service_1.NodeServerService,
        ]
    })
], NodeServerModule);
exports.NodeServerModule = NodeServerModule;
//# sourceMappingURL=node-server.module.js.map