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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeServerService = void 0;
const file_types_constants_1 = require("../../constants/file-types.constants");
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const moment = require("moment");
const node_server_file_1 = require("./dto/node-server-file");
const http_error_messages_constants_1 = require("../../constants/http-error-messages.constants");
const config_1 = require("@nestjs/config");
let NodeServerService = class NodeServerService {
    constructor(configService) {
        this.configService = configService;
        this._serverPath = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
    }
    async onModuleInit() {
        const existRootPath = fs.existsSync(this.configService.get('server.rootPath'));
        if (!existRootPath) {
            console.log(`[Node Server Init] Root path '${this.configService.get('server.rootPath')}' do not exist`);
            throw new Error(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.ROOT_PATH_NOT_EXIST);
        }
        const serverPath = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
        const existServerFolder = fs.existsSync(serverPath);
        if (!existServerFolder) {
            fs.mkdirSync(serverPath, { recursive: true });
            if (!fs.existsSync(serverPath)) {
                console.log(`[Node Server Init] Unnable to create server folder '${serverPath}'`);
                throw new Error(http_error_messages_constants_1.BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_CREATE_SERVER_FOLDER);
            }
        }
        console.log(`[Node Server Init] Loaded successfully in path '${serverPath}'`);
    }
    async exists(nodeServerDto, checkNewPath = false) {
        if (!checkNewPath) {
            return fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        }
        return fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
    }
    async isDirectory(nodeServerDto) {
        const isDirectory = await new Promise((resolve) => {
            fs.stat(`${this._serverPath}${nodeServerDto.path}`, (err, stats) => {
                if (err) {
                    console.error(err);
                    return resolve(false);
                }
                if (stats.isDirectory()) {
                    return resolve(true);
                }
                return resolve(false);
            });
        });
        return isDirectory;
    }
    async isFile(nodeServerDto) {
        const isFile = await new Promise((resolve) => {
            fs.stat(`${this._serverPath}${nodeServerDto.path}`, (err, stats) => {
                if (err) {
                    console.error(err);
                    return resolve(false);
                }
                if (stats.isFile()) {
                    return resolve(true);
                }
                return resolve(false);
            });
        });
        return isFile;
    }
    async list(nodeServerDto) {
        const list = await new Promise((resolve) => {
            const response = [];
            fs.readdir(`${this._serverPath}${nodeServerDto.path}`, (err, files) => {
                if (!files || (files && files.length == 0)) {
                    return resolve([]);
                }
                for (const file of files) {
                    const fileDetails = fs.lstatSync(path.resolve(`${this._serverPath}${nodeServerDto.path}`, file));
                    const listResponse = new node_server_file_1.NodeServerFileDto(file);
                    if (fileDetails.isDirectory()) {
                        listResponse.type = file_types_constants_1.FILE_TYPES_CONSTANTS.DIRECTORY;
                        listResponse.extension = '';
                        listResponse.image = 'folder.png';
                        listResponse.typeDescription = 'Carpeta de archivos';
                    }
                    else {
                        listResponse.type = file_types_constants_1.FILE_TYPES_CONSTANTS.FILE;
                        listResponse.extension = listResponse.name.split('.')[listResponse.name.split('.').length - 1] || '';
                        listResponse.image = listResponse.extension && listResponse.extension != listResponse.name
                            ? `${listResponse.extension}.png`
                            : 'blank.png';
                        listResponse.typeDescription = listResponse.extension && listResponse.extension != listResponse.name
                            ? `Archivo ${listResponse.extension.toUpperCase()}`
                            : '';
                    }
                    listResponse.size = fileDetails.size;
                    listResponse.modifiedDate = fileDetails.mtime;
                    response.push(listResponse);
                }
                return resolve(response);
            });
        });
        return list;
    }
    async delete(nodeServerDto) {
        fs.rmSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: true, force: true });
        const existOriginalFile = fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        if (existOriginalFile) {
            return false;
        }
        return true;
    }
    async copy(nodeServerDto) {
        const isDirectory = await this.isDirectory(nodeServerDto);
        if (isDirectory) {
            fs.mkdirSync(`${this._serverPath}${nodeServerDto.newPath}`, { recursive: true });
            this.copyFolderRecursive(`${this._serverPath}${nodeServerDto.path}`, `${this._serverPath}${nodeServerDto.newPath}`, nodeServerDto.recursive == true ? true : false);
        }
        else {
            fs.copyFileSync(`${this._serverPath}${nodeServerDto.path}`, `${this._serverPath}${nodeServerDto.newPath}`);
        }
        const existCopiedFile = fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
        if (!existCopiedFile) {
            return false;
        }
        return true;
    }
    async move(nodeServerDto) {
        const isDirectory = await this.isDirectory(nodeServerDto);
        if (isDirectory) {
            fs.mkdirSync(`${this._serverPath}${nodeServerDto.newPath}`, { recursive: true });
            this.copyFolderRecursive(`${this._serverPath}${nodeServerDto.path}`, `${this._serverPath}${nodeServerDto.newPath}`, nodeServerDto.recursive == true ? true : false);
        }
        else {
            fs.copyFileSync(`${this._serverPath}${nodeServerDto.path}`, `${this._serverPath}${nodeServerDto.newPath}`);
        }
        const existCopiedFile = fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
        if (!existCopiedFile) {
            return false;
        }
        fs.rmSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: true, force: true });
        const existOriginalFile = fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        if (existOriginalFile) {
            return false;
        }
        return true;
    }
    async validateServerPath(nodeServerDto) {
        const path = `${this._serverPath}${nodeServerDto.path}`;
        const startsWithServerPath = path.startsWith(this._serverPath);
        if (!startsWithServerPath) {
            return false;
        }
        const inputPath = path.split(this._serverPath)[1];
        if (!inputPath) {
            return false;
        }
        if (inputPath.includes('./')
            || inputPath.includes('/..')
            || inputPath.includes('../')
            || inputPath.includes('..')) {
            return false;
        }
        if (inputPath.trim() == '/') {
            return true;
        }
        const serverSidePath = path.split(inputPath)[0];
        const splitServerSidePath = serverSidePath.split('/');
        if (splitServerSidePath[splitServerSidePath.length - 1].trim() != this.configService.get('server.serverServerFolder').trim()) {
            return false;
        }
        return true;
    }
    async formatDoubleRootPath(nodeServerDto, formatNewPath = false) {
        if (!formatNewPath) {
            while (nodeServerDto.path.includes('//')) {
                nodeServerDto.path = nodeServerDto.path.replace('//', '/');
            }
        }
        else {
            while (nodeServerDto.newPath.includes('//')) {
                nodeServerDto.newPath = nodeServerDto.newPath.replace('//', '/');
            }
        }
        return nodeServerDto;
    }
    async createFolder(nodeServerDto) {
        const folderCreated = await new Promise(async (resolve) => {
            fs.mkdirSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: nodeServerDto.recursive == true ? true : false });
            const existsNewFolder = await this.exists(nodeServerDto);
            if (!existsNewFolder) {
                return resolve(false);
            }
            return resolve(true);
        });
        return folderCreated;
    }
    async uploadFiles(nodeServerDto, files) {
        const filesUploaded = await new Promise(async (resolve) => {
            let result = false;
            try {
                for (const file of files) {
                    fs.writeFileSync(`${this._serverPath}${nodeServerDto.path}/${file.originalname}`, file.buffer);
                }
                result = true;
            }
            catch (error) {
                result = false;
            }
            return resolve(result);
        });
        return filesUploaded;
    }
    async downloadFolder(nodeServerDto, rootFiles) {
        let zipName = '';
        if (`${this._serverPath}${nodeServerDto.path}` == this._serverPath) {
            zipName = `nodeserver_backup_${moment(new Date()).format(`DD-MM-yyy`)}.zip`;
        }
        else {
            const formatName = nodeServerDto.path.split("/")[nodeServerDto.path.split("/").length - 1];
            zipName = `${formatName}.zip`;
        }
        const archive = archiver('zip', { zlib: { level: 9 } });
        const output = fs.createWriteStream(`${this._serverPath}${nodeServerDto.path}/${zipName}`);
        archive.pipe(output);
        if (rootFiles && rootFiles.length > 0) {
            for (const file of rootFiles) {
                if (file.type == file_types_constants_1.FILE_TYPES_CONSTANTS.DIRECTORY) {
                    archive.directory(`${this._serverPath}${nodeServerDto.path}/${file.name}`, file.name);
                }
                else {
                    archive.append(fs.createReadStream(`${this._serverPath}${nodeServerDto.path}/${file.name}`), { name: file.name });
                }
            }
        }
        archive.finalize();
        const path = `${this._serverPath}${nodeServerDto.path}`;
        const nodeServerDownload = await new Promise((resolve) => {
            output.on('close', function () {
                const backupBase64 = fs.readFileSync(`${path}/${zipName}`, { encoding: 'base64' });
                if (fs.existsSync(`${path}/${zipName}`)) {
                    fs.rmSync(`${path}/${zipName}`, { recursive: true, force: true });
                }
                return resolve({
                    fileName: zipName,
                    fileType: 'zip',
                    filePath: `${path}`,
                    base64: backupBase64,
                });
            });
        });
        return nodeServerDownload;
    }
    async downloadFile(nodeServerDto) {
        const backupBase64 = fs.readFileSync(`${this._serverPath}/${nodeServerDto.path}`, { encoding: 'base64' });
        const formatName = nodeServerDto.path.split("/")[nodeServerDto.path.split("/").length - 1];
        const nodeServerDownload = {
            fileName: formatName,
            fileType: 'zip',
            filePath: `${path}`,
            base64: backupBase64,
        };
        return nodeServerDownload;
    }
    async filterListFiles(list, nodeServerDto, filteredList, key) {
        if (!list || (list && list.length == 0)) {
            return filteredList;
        }
        for (const file of list) {
            if (key == 'name') {
                if (file[key] == nodeServerDto.filter[key] ||
                    file[key].includes(nodeServerDto.filter[key])) {
                    const existFilteredFile = filteredList.find(f => f.name == file.name);
                    if (!existFilteredFile) {
                        filteredList.push(file);
                    }
                }
                continue;
            }
            if (file[key] == nodeServerDto.filter[key]) {
                const existFilteredFile = filteredList.find(f => f.name == file.name);
                if (!existFilteredFile) {
                    filteredList.push(file);
                }
            }
        }
        return filteredList;
    }
    copyFolderRecursive(srcDir, dstDir, recursive, verbose = true) {
        let results = [];
        let src;
        let dst;
        fs.readdirSync(srcDir).forEach(function (file) {
            if (verbose)
                console.log(`[copyFolderRecursive] File: ${file}`);
            src = srcDir + '/' + file;
            dst = dstDir + '/' + file;
            const stat = fs.statSync(src);
            if (stat && stat.isDirectory()) {
                if (verbose)
                    console.log(`[copyFolderRecursive] File '${file}' is directory`);
                try {
                    if (verbose)
                        console.log(`[copyFolderRecursive] Dir '${file}' creating: ${dst}`);
                    fs.mkdirSync(dst, { recursive: recursive });
                }
                catch (e) {
                    if (verbose)
                        console.log(`[copyFolderRecursive] Dir '${file}' already exists: ${dst}`);
                }
                results = results.concat(this.copyFolderRecursive(src, dst, recursive));
            }
            else {
                if (verbose)
                    console.log(`[copyFolderRecursive] File '${file}' is file`);
                try {
                    if (verbose)
                        console.log(`[copyFolderRecursive] File '${file}' copying: ${dst}`);
                    fs.writeFileSync(dst, fs.readFileSync(src));
                }
                catch (e) {
                    if (verbose)
                        console.log(`[copyFolderRecursive] File '${file}' couldnt copy: ${dst}`);
                }
                results.push(src);
            }
        });
        if (results && results.length == 0) {
            fs.mkdirSync(dstDir, { recursive: recursive });
        }
        return results;
    }
};
NodeServerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NodeServerService);
exports.NodeServerService = NodeServerService;
//# sourceMappingURL=node-server.service.js.map