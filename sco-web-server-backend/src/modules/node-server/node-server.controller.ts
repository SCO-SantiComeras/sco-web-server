import { BACKEND_WEBSOCKET_EVENTS } from './../../constants/websocket.constants';
import { BACKEND_HTTP_ERROR_CONSTANTS } from 'src/constants/http-error-messages.constants';
import { Body, Controller, Res, Post, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { NodeServerService } from './node-server.service';
import { AuthGuard } from '@nestjs/passport';
import { NodeServerDto } from './dto/node-server';
import { NodeServerFileDto } from './dto/node-server-file';
import { WebsocketGateway } from 'sco-nestjs-utilities';
import { ConfigService } from '@nestjs/config';

@Controller('api/v1/node-server')
@ApiTags('Node server')
export class NodeServerController {
  
  constructor(
    private readonly nodeServerService: NodeServerService,
    private readonly websocketsService: WebsocketGateway,
    private readonly configService: ConfigService,
  ) {}

  @Post('exists')
  async exists(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[exists] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[exists] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }
    
    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    return res.status(200).json(exists);
  }

  @Post('isDirectory')
  async isDirectory(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[isDirectory] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[isDirectory] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[isDirectory] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }
    
    const isDirectory: boolean = await this.nodeServerService.isDirectory(nodeServerDto);
    return res.status(200).json(isDirectory);
  }

  @Post('isFile')
  async isFile(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[isFile] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[isFile] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[isFile] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }
    
    const isFile: boolean = await this.nodeServerService.isFile(nodeServerDto);
    return res.status(200).json(isFile);
  }

  @Post('list')
  async list(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<NodeServerFileDto[], Record<string, NodeServerFileDto[]>>> {
    if (!nodeServerDto.path) {
      console.log(`[list] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[list] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const isDirectory: boolean = await this.nodeServerService.isDirectory(nodeServerDto);
    if (!isDirectory) {
      console.log(`[list] Path '${nodeServerDto.path}' is not directory`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_DIRECTORY, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[list] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }

    const list: NodeServerFileDto[] = await  this.nodeServerService.list(nodeServerDto);
    return res.status(200).json(list);
  }

  @Post('delete')
  async delete(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[delete] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[delete] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const rootPath: string = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverServerFolder')}`;
    if (`${rootPath}${nodeServerDto.path}` == (`${rootPath}/` || `${rootPath}`)) {
      console.log(`[delete] Unnable to delete server folder '${rootPath}${nodeServerDto.path}'`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_DELETE_SERVER_FOLDER, HttpStatus.CONFLICT);
    }

    const appPath: string = `${this.configService.get('server.rootPath')}/${this.configService.get('server.serverAppFolder')}`;
    if (`${appPath}${nodeServerDto.path}` == (`${appPath}/`) || `${appPath}`) {
      console.log(`[delete] Unnable to delete app folder '${appPath}${nodeServerDto.path}'`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.UNNABLE_DELETE_APP_FOLDER, HttpStatus.CONFLICT);
    }
    
    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[delete] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }

    const deleted: boolean = await  this.nodeServerService.delete(nodeServerDto);
    if (deleted) {
      this.websocketsService.notifyWebsockets(BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }
    
    return res.status(200).json(deleted);
  }

  @Post('copy')
  async copy(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[copy] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    if (!nodeServerDto.newPath) {
      console.log(`[copy} New path '${nodeServerDto.newPath}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[copy] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const existNewPath: boolean = await this.nodeServerService.exists(nodeServerDto, true);
    if (existNewPath) {
      console.log(`[copy] New path '${nodeServerDto.newPath}' already exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[copy] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }

    const copy: boolean = await  this.nodeServerService.copy(nodeServerDto);
    if (copy) {
      this.websocketsService.notifyWebsockets(BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }

    return res.status(200).json(copy);
  }

  @Post('move')
  async move(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[move] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    if (!nodeServerDto.newPath) {
      console.log(`[move} New path '${nodeServerDto.newPath}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (!exists) {
      console.log(`[move] Path '${nodeServerDto.path}' not exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_EXISTS, HttpStatus.CONFLICT);
    }

    const existNewPath: boolean = await this.nodeServerService.exists(nodeServerDto, true);
    if (existNewPath) {
      console.log(`[move] New path '${nodeServerDto.newPath}' already exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[move] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }

    const move: boolean = await  this.nodeServerService.move(nodeServerDto);
    if (move) {
      this.websocketsService.notifyWebsockets(BACKEND_WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }

    return res.status(200).json(move);
  }

  @Post('createFolder')
  async createFolder(
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    if (!nodeServerDto.path) {
      console.log(`[createFolder] Path '${nodeServerDto.path}' not provided`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const exists: boolean = await this.nodeServerService.exists(nodeServerDto);
    if (exists) {
      console.log(`[createFolder] Path '${nodeServerDto.path}' already exists`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const pathIsValid: boolean = await this.nodeServerService.validateServerPath(nodeServerDto);
    if (!pathIsValid) {
      console.log(`[createFolder] Path '${nodeServerDto.path}' is not in valid format`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.NODE_SERVER.PATH_IS_NOT_VALID, HttpStatus.CONFLICT);
    }
    
    const createFolder: boolean = await this.nodeServerService.createFolder(nodeServerDto);
    return res.status(200).json(createFolder);
  }
}
