/// <reference types="multer" />
import { Response } from 'express';
import { NodeServerService } from './node-server.service';
import { NodeServerDto } from './dto/node-server';
import { NodeServerFileDto } from './dto/node-server-file';
import { WebsocketGateway } from 'sco-nestjs-utilities';
import { ConfigService } from '@nestjs/config';
import { NodeServerDownloadDto } from './dto/node-server-download';
export declare class NodeServerController {
    private readonly nodeServerService;
    private readonly websocketsService;
    private readonly configService;
    constructor(nodeServerService: NodeServerService, websocketsService: WebsocketGateway, configService: ConfigService);
    exists(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    isDirectory(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    isFile(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    list(res: Response, nodeServerDto: NodeServerDto): Promise<Response<NodeServerFileDto[], Record<string, NodeServerFileDto[]>>>;
    delete(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    copy(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    move(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    createFolder(res: Response, nodeServerDto: NodeServerDto): Promise<Response<boolean, Record<string, boolean>>>;
    uploadFiles(res: Response, path: string, files: Array<Express.Multer.File>): Promise<Response<boolean, Record<string, boolean>>>;
    downloadBackup(res: Response): Promise<Response<NodeServerDownloadDto, Record<string, NodeServerDownloadDto>>>;
    downloadFolder(res: Response, nodeServerDto: NodeServerDto): Promise<Response<NodeServerDownloadDto, Record<string, NodeServerDownloadDto>>>;
    downloadFile(res: Response, nodeServerDto: NodeServerDto): Promise<Response<NodeServerDownloadDto, Record<string, NodeServerDownloadDto>>>;
}
