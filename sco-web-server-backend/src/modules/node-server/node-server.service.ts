import { FILE_TYPES_CONSTANTS } from './../../constants/file-types.constants';
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import { NodeServerDto } from "./dto/node-server";
import { NodeServerFileDto } from "./dto/node-server-file";
import { BACKEND_HTTP_ERROR_CONSTANTS } from 'src/constants/http-error-messages.constants';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NodeServerService {

    private _serverPath: string; 

    constructor(private readonly configService: ConfigService) { 
        this._serverPath = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
    }

    async onModuleInit() {
        const existRootPath: boolean = fs.existsSync(this.configService.get('server.rootPath'));
        if (!existRootPath) {
            console.log(`[Node Server Init] Root path '${this.configService.get('server.rootPath')}' do not exist`);
            throw new Error(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.ROOT_PATH_NOT_EXIST);
        }

        const serverPath: string = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
        const existServerFolder: boolean = fs.existsSync(serverPath);
        if (!existServerFolder) {
            fs.mkdirSync(serverPath, { recursive: true });
            if (!fs.existsSync(serverPath)) {
                console.log(`[Node Server Init] Unnable to create server folder '${serverPath}'`);
                throw new Error(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_CREATE_SERVER_FOLDER);
            }
        }
        
        const appPath: string = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverAppFolder')}`;
        const existAppFolder: boolean = fs.existsSync(appPath);
        if (!existAppFolder) {
            fs.mkdirSync(appPath, { recursive: true });
            if (!fs.existsSync(appPath)) {
                console.log(`[Node Server Init] Unnable to create app folder '${appPath}'`);
                throw new Error(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_CREATE_APP_FOLDER);
            }
        }
        
        console.log(`[Node Server Init] Loaded successfully in path '${serverPath}' & '${appPath}'`);
    }

    async exists(nodeServerDto: NodeServerDto, checkNewPath: boolean = false): Promise<boolean> {
        if (!checkNewPath) {
            return fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        }
        
        return fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
    }

    async isDirectory(nodeServerDto: NodeServerDto): Promise<boolean> {
        const isDirectory: boolean = await new Promise<boolean>((resolve) => {
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

    async isFile(nodeServerDto: NodeServerDto): Promise<boolean> {
        const isFile: boolean = await new Promise<boolean>((resolve) => {
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

    async list(nodeServerDto: NodeServerDto): Promise<NodeServerFileDto[]> {
        const list: NodeServerFileDto[] = await new Promise<NodeServerFileDto[]>((resolve) => {
            const response: NodeServerFileDto[] = [];

            fs.readdir(`${this._serverPath}${nodeServerDto.path}`, (err, files) => {
                if (!files || (files && files.length == 0)) {
                    return resolve([]);
                }

                for (const file of files) {
                    const fileDetails = fs.lstatSync(path.resolve(`${this._serverPath}${nodeServerDto.path}`, file));

                    const listResponse: NodeServerFileDto = new NodeServerFileDto(file);
                    if (fileDetails.isDirectory()) {
                        listResponse.type = FILE_TYPES_CONSTANTS.DIRECTORY;
                        listResponse.extension = '';
                        listResponse.image = 'folder.png';
                        listResponse.typeDescription = 'Carpeta de archivos';
                    } else {
                        listResponse.type = FILE_TYPES_CONSTANTS.FILE;
                        listResponse.extension = listResponse.name.split('.')[listResponse.name.split('.').length-1] || '';
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

    async delete(nodeServerDto: NodeServerDto): Promise<boolean> {
        fs.rmSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: true, force: true });
        const existOriginalFile: boolean = fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        if (existOriginalFile) {
            return false;
        }

        return true;
    }

    async copy(nodeServerDto: NodeServerDto): Promise<boolean> {
        const isDirectory: boolean = await this.isDirectory(nodeServerDto);
        if (isDirectory) {
            copyFolderRecursive(
                `${this._serverPath}${nodeServerDto.path}`,
                `${this._serverPath}${nodeServerDto.newPath}`
            );
        } else {
            fs.copyFileSync(
                `${this._serverPath}${nodeServerDto.path}`,
                `${this._serverPath}${nodeServerDto.newPath}`
            ); 
        }

        const existCopiedFile: boolean = fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
        if (!existCopiedFile) {
            return false;
        }

        return true;
    }

    async move(nodeServerDto: NodeServerDto): Promise<boolean> {
        const isDirectory: boolean = await this.isDirectory(nodeServerDto);
        if (isDirectory) {
            copyFolderRecursive(
                `${this._serverPath}${nodeServerDto.path}`,
                `${this._serverPath}${nodeServerDto.newPath}`
            );
        } else {
            fs.copyFileSync(
                `${this._serverPath}${nodeServerDto.path}`,
                `${this._serverPath}${nodeServerDto.newPath}`
            ); 
        }

        const existCopiedFile: boolean = fs.existsSync(`${this._serverPath}${nodeServerDto.newPath}`);
        if (!existCopiedFile) {
            return false;
        }

        fs.rmSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: true, force: true });
        const existOriginalFile: boolean = fs.existsSync(`${this._serverPath}${nodeServerDto.path}`);
        if (existOriginalFile) {
            return false;
        }

        return true;
    }

    async validateServerPath(nodeServerDto: NodeServerDto): Promise<boolean> {
        const path: string = `${this._serverPath}${nodeServerDto.path}`;

        const startsWithServerPath: boolean = path.startsWith(this._serverPath);
        if (!startsWithServerPath) {
            return false;
        }

        const inputPath: string = path.split(this._serverPath)[1];
        if (!inputPath) {
            return false;
        }

        if (
            inputPath.includes('./') 
            || inputPath.includes('/..') 
            || inputPath.includes('../') 
            || inputPath.includes('..')
        ) {
            return false;
        }

        if (inputPath.trim() == '/') {
            return true;
        }

        const serverSidePath: string = path.split(inputPath)[0];
        const splitServerSidePath: string[] = serverSidePath.split('/');
        if (splitServerSidePath[splitServerSidePath.length-1].trim() != this.configService.get('server.serverServerFolder').trim()) {
            return false;
        }

        return true;
    }

    async createFolder(nodeServerDto: NodeServerDto): Promise<boolean> {
        const folderCreated: boolean = await new Promise<boolean>(async (resolve) => {
            fs.mkdirSync(`${this._serverPath}${nodeServerDto.path}`, { recursive: nodeServerDto.recursive == true ? true : false });

            const existsNewFolder: boolean = await this.exists(nodeServerDto);
            if (!existsNewFolder) {
                return resolve(false);
            }

            return resolve(true);
        });


        return folderCreated;
    }
}

const copyFolderRecursive = function(srcDir: string, dstDir: string, verbose: boolean = true) {
    let results = [];

    let src: string;
    let dst: string;
    fs.readdirSync(srcDir).forEach(function(file) {
        if (verbose) console.log(`[copyFolderRecursive] File: ${file}`);
        src = srcDir + '/' + file;
        dst = dstDir + '/' + file;
        
        const stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
            if (verbose) console.log(`[copyFolderRecursive] File '${file}' is directory`);

            try {
                if (verbose) console.log(`[copyFolderRecursive] Dir '${file}' creating: ${dst}`);
                fs.mkdirSync(dst, { recursive: true });
            } catch(e) {
                if (verbose) console.log(`[copyFolderRecursive] Dir '${file}' already exists: ${dst}`);
            }
            results = results.concat(copyFolderRecursive(src, dst));
        } else {
            if (verbose) console.log(`[copyFolderRecursive] File '${file}' is file`);

            try {
                if (verbose) console.log(`[copyFolderRecursive] File '${file}' copying: ${dst}`);
                fs.writeFileSync(dst, fs.readFileSync(src));
            } catch(e) {
                if (verbose) console.log(`[copyFolderRecursive] File '${file}' couldnt copy: ${dst}`);
            }
            results.push(src);
        }
    });

    if (results && results.length == 0) {
        fs.mkdirSync(dstDir, { recursive: true });
    }

    return results;
}