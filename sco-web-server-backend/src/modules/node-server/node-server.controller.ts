import { BACKEND_HTTP_ERROR_CONSTANTS } from 'src/constants/http-error-messages.constants';
import { Body, Controller, Res, Post, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { IUser, TRANSLATE_CONSTANTS, USERS_CONSTANTS, UsersRepository } from 'sco-nestjs-utilities';
import { NodeServerService } from './node-server.service';
import { AuthGuard } from '@nestjs/passport';
import { NodeServerDto } from './dto/node-server';

@Controller('api/v1/node-server')
@ApiTags('Node server')
export class NodeServerController {
  
  constructor(
    private readonly nodeServerService: NodeServerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Post('remote-list')
  /* @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth') */
  async sendReoveryPasswordEmail(
    @Req() req: Request, 
    @Res() res: Response, 
    @Body() nodeServerDto: NodeServerDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    /* const existUser: IUser = await this.usersRepository.findUserByEmail(sendRecoveryPasswordDto.email);
    if (!existUser) {
      console.log(`[sendReoveryPasswordEmail] User email '${sendRecoveryPasswordDto.email}' not found`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.USERS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } */

    console.log("sendReoveryPasswordEmail")

    return res.status(200).json(true);
  }
}
