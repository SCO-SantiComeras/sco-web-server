"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeServerController = void 0;
const websocket_constants_1 = require("../../constants/websocket.constants");
const http_error_messages_constants_1 = require("../../constants/http-error-messages.constants");
const common_1 = require("@nestjs/common");
const node_server_service_1 = require("./node-server.service");
const passport_1 = require("@nestjs/passport");
const node_server_1 = require("./dto/node-server");
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
let NodeServerController = class NodeServerController {
    constructor(nodeServerService, websocketsService, configService) {
        this.nodeServerService = nodeServerService;
        this.websocketsService = websocketsService;
        this.configService = configService;
    }
    async exists(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[exists] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[exists] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        return res.status(200).json(exists);
    }
    async isDirectory(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[isDirectory] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[isDirectory] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[isDirectory] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const isDirectory = await this.nodeServerService.isDirectory(nodeServerDto);
        return res.status(200).json(isDirectory);
    }
    async isFile(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[isFile] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[isFile] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[isFile] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const isFile = await this.nodeServerService.isFile(nodeServerDto);
        return res.status(200).json(isFile);
    }
    async list(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[list] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const isDirectory = await this.nodeServerService.isDirectory(nodeServerDto);
        if (!isDirectory) {
            console.log(`[list] Path '${nodeServerDto.path}' is not directory`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_DIRECTORY, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[list] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[list] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const list = await this.nodeServerService.list(nodeServerDto);
        let filteredList = [];
        let filterActive = false;
        if (nodeServerDto.filter) {
            const filterKeys = Object.keys(nodeServerDto.filter);
            if (filterKeys && filterKeys.length > 0) {
                for (const key of filterKeys) {
                    if (!filterActive)
                        filterActive = true;
                    filteredList = await this.nodeServerService.filterListFiles(list, nodeServerDto, filteredList, key);
                }
            }
        }
        return res.status(200).json(filterActive
            ? filteredList && filteredList.length > 0
                ? filteredList
                : []
            : list && list.length > 0
                ? list
                : []);
    }
    async delete(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[delete] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[delete] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[delete] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const rootPath = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
        if (`${rootPath}${nodeServerDto.path}` == (`${rootPath}/` || `${rootPath}`)) {
            console.log(`[delete] Unnable to delete server folder '${rootPath}${nodeServerDto.path}'`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_DELETE_SERVER_FOLDER, common_1.HttpStatus.CONFLICT);
        }
        const deleted = await this.nodeServerService.delete(nodeServerDto);
        if (deleted) {
            await this.websocketsService.notifyWebsockets(websocket_constants_1.BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
        }
        return res.status(200).json(deleted);
    }
    async copy(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[copy] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        if (!nodeServerDto.newPath) {
            console.log(`[copy} New path '${nodeServerDto.newPath}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto, true);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[copy] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[copy] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const existNewPath = await this.nodeServerService.exists(nodeServerDto, true);
        if (existNewPath) {
            console.log(`[copy] New path '${nodeServerDto.newPath}' already exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_ALREADY_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const copy = await this.nodeServerService.copy(nodeServerDto);
        if (copy) {
            await this.websocketsService.notifyWebsockets(websocket_constants_1.BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
        }
        return res.status(200).json(copy);
    }
    async move(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[move] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        if (!nodeServerDto.newPath) {
            console.log(`[move} New path '${nodeServerDto.newPath}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto, true);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[move] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[move] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const existNewPath = await this.nodeServerService.exists(nodeServerDto, true);
        if (existNewPath) {
            console.log(`[move] New path '${nodeServerDto.newPath}' already exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_ALREADY_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const move = await this.nodeServerService.move(nodeServerDto);
        if (move) {
            await this.websocketsService.notifyWebsockets(websocket_constants_1.BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
        }
        return res.status(200).json(move);
    }
    async createFolder(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[createFolder] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[createFolder] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (exists) {
            console.log(`[createFolder] Path '${nodeServerDto.path}' already exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_ALREADY_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const createFolder = await this.nodeServerService.createFolder(nodeServerDto);
        if (createFolder) {
            await this.websocketsService.notifyWebsockets(websocket_constants_1.BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
        }
        return res.status(200).json(createFolder);
    }
    async uploadFiles(res, path, files) {
        if (!path) {
            console.log(`[createFolder] Path '${path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        let currentPath = JSON.parse(path);
        while (currentPath.includes('-rootParse-')) {
            currentPath = currentPath.replace('-rootParse-', '/');
        }
        let nodeServerDto = { path: currentPath };
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[createFolder] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const uploadFiles = await this.nodeServerService.uploadFiles(nodeServerDto, files);
        if (uploadFiles) {
            await this.websocketsService.notifyWebsockets(websocket_constants_1.BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
        }
        return res.status(200).json(uploadFiles);
    }
    async downloadBackup(res) {
        const nodeServerDto = { path: '' };
        const rootFiles = await this.nodeServerService.list(nodeServerDto);
        if (!rootFiles || (rootFiles && rootFiles.length == 0)) {
            console.log(`[downloadBackup] No files in root server path to download`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.ROOT_PATH_NO_FILES, common_1.HttpStatus.CONFLICT);
        }
        const nodeServerDownload = await this.nodeServerService.downloadFolder(nodeServerDto, rootFiles);
        if (!nodeServerDownload) {
            console.log(`[downloadBackup] Unnable to create root path backup`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_CREATE_ROOT_PATH_BACKUP, common_1.HttpStatus.CONFLICT);
        }
        return res.status(200).json(nodeServerDownload);
    }
    async downloadFolder(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[downloadFolder] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const rootFiles = await this.nodeServerService.list(nodeServerDto) || [];
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[downloadFolder] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[downloadFolder] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const nodeServerDownload = await this.nodeServerService.downloadFolder(nodeServerDto, rootFiles);
        if (!nodeServerDownload) {
            console.log(`[downloadFolder] Unnable to download folder`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_DOWNLOAD_FOLDER, common_1.HttpStatus.CONFLICT);
        }
        return res.status(200).json(nodeServerDownload);
    }
    async downloadFile(res, nodeServerDto) {
        if (!nodeServerDto.path) {
            console.log(`[downloadFolder] Path '${nodeServerDto.path}' not provided`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        nodeServerDto = await this.nodeServerService.formatDoubleRootPath(nodeServerDto);
        const pathIsValid = await this.nodeServerService.validateServerPath(nodeServerDto);
        if (!pathIsValid) {
            console.log(`[downloadFolder] Path '${nodeServerDto.path}' is not in valid format`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, common_1.HttpStatus.CONFLICT);
        }
        const exists = await this.nodeServerService.exists(nodeServerDto);
        if (!exists) {
            console.log(`[downloadFile] Path '${nodeServerDto.path}' not exists`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, common_1.HttpStatus.CONFLICT);
        }
        const nodeServerDownload = await this.nodeServerService.downloadFile(nodeServerDto);
        if (!nodeServerDownload) {
            console.log(`[downloadFile] Unnable to download file`);
            throw new common_1.HttpException(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_DOWNLOAD_FILE, common_1.HttpStatus.CONFLICT);
        }
        return res.status(200).json(nodeServerDownload);
    }
};
__decorate([
    (0, common_1.Post)('exists'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "exists", null);
__decorate([
    (0, common_1.Post)('isDirectory'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "isDirectory", null);
__decorate([
    (0, common_1.Post)('isFile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "isFile", null);
__decorate([
    (0, common_1.Post)('list'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('copy'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "copy", null);
__decorate([
    (0, common_1.Post)('move'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "move", null);
__decorate([
    (0, common_1.Post)('createFolder'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)('uploadFiles/:path'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('path')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('downloadBackup'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "downloadBackup", null);
__decorate([
    (0, common_1.Post)('downloadFolder'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "downloadFolder", null);
__decorate([
    (0, common_1.Post)('downloadFile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_server_1.NodeServerDto]),
    __metadata("design:returntype", Promise)
], NodeServerController.prototype, "downloadFile", null);
NodeServerController = __decorate([
    (0, common_1.Controller)('api/v1/node-server'),
    __metadata("design:paramtypes", [node_server_service_1.NodeServerService,
        sco_nestjs_utilities_1.WebsocketGateway,
        config_1.ConfigService])
], NodeServerController);
exports.NodeServerController = NodeServerController;
//# sourceMappingURL=node-server.controller.js.map