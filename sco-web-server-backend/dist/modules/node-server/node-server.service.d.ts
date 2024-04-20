/// <reference types="multer" />
import { NodeServerDto } from "./dto/node-server";
import { NodeServerFileDto } from "./dto/node-server-file";
import { ConfigService } from '@nestjs/config';
import { NodeServerDownloadDto } from './dto/node-server-download';
export declare class NodeServerService {
    private readonly configService;
    private _serverPath;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    exists(nodeServerDto: NodeServerDto, checkNewPath?: boolean): Promise<boolean>;
    isDirectory(nodeServerDto: NodeServerDto): Promise<boolean>;
    isFile(nodeServerDto: NodeServerDto): Promise<boolean>;
    list(nodeServerDto: NodeServerDto): Promise<NodeServerFileDto[]>;
    delete(nodeServerDto: NodeServerDto): Promise<boolean>;
    copy(nodeServerDto: NodeServerDto): Promise<boolean>;
    move(nodeServerDto: NodeServerDto): Promise<boolean>;
    validateServerPath(nodeServerDto: NodeServerDto): Promise<boolean>;
    formatDoubleRootPath(nodeServerDto: NodeServerDto, formatNewPath?: boolean): Promise<NodeServerDto>;
    createFolder(nodeServerDto: NodeServerDto): Promise<boolean>;
    uploadFiles(nodeServerDto: NodeServerDto, files: Array<Express.Multer.File>): Promise<boolean>;
    downloadFolder(nodeServerDto: NodeServerDto, rootFiles: NodeServerFileDto[]): Promise<NodeServerDownloadDto>;
    downloadFile(nodeServerDto: NodeServerDto): Promise<NodeServerDownloadDto>;
    filterListFiles(list: NodeServerFileDto[], nodeServerDto: NodeServerDto, filteredList: NodeServerFileDto[], key: string): Promise<NodeServerFileDto[]>;
    private copyFolderRecursive;
}
