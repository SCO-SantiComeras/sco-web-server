import { BACKEND_HTTP_ERROR_CONSTANTS } from 'src/constants/http-error-messages.constants';
import { Body, Controller, Res, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { IUser, TRANSLATE_CONSTANTS, USERS_CONSTANTS, UsersRepository } from 'sco-nestjs-utilities';
import { EmailTemplatesService } from './email-templates.service';
import { SendActivationUserDto } from './dto/send-activation-user.dto';
import { SendRecoveryPasswordDto } from './dto/send-recovery-password.dto';

@Controller('api/v1/email-templates')
@ApiTags('Email templates')
export class EmailTemplatesController {
  
  constructor(
    private readonly emailTemplatesService: EmailTemplatesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Post('sendReoveryPasswordEmail')
  @ApiOperation({
    summary: `Send recovery password email`,
    description: 'Send a email to user with a password reset request',
  })
  @ApiBody({
    description: 'Send a recovery password email with the class SendRecoveryPasswordDto',
    type: SendRecoveryPasswordDto,
    examples: {
      a: {
        value: {
          user: {
            name: USERS_CONSTANTS.PUBLIC.NAME,
            password: USERS_CONSTANTS.PUBLIC.PASSWORD,
            email: USERS_CONSTANTS.PUBLIC.EMAIL,
            active: USERS_CONSTANTS.PUBLIC.ACTIVE,
            role: USERS_CONSTANTS.PUBLIC.ROLE,
          },
          appHost: 'localhost',
          appPort: 4200,
          tokenExpiration: 30,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Recovery password email sended successfully',
  })
  @ApiResponse({
    status: 402,
    description: 'App host parameter not provided',
  })
  @ApiResponse({
    status: 402,
    description: 'App port parameter not provided',
  })
  @ApiResponse({
    status: 402,
    description: 'Token expiration parameter not provided',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Unnable to send recovery password email',
  })
  async sendReoveryPasswordEmail(
    @Req() req: Request, 
    @Res() res: Response, 
    @Body() sendRecoveryPasswordDto: SendRecoveryPasswordDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    const existUser: IUser = await this.usersRepository.findUserByEmail(sendRecoveryPasswordDto.email);
    if (!existUser) {
      console.log(`[sendReoveryPasswordEmail] User email '${sendRecoveryPasswordDto.email}' not found`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.USERS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (!sendRecoveryPasswordDto.appHost) {
      console.log(`[sendReoveryPasswordEmail] ${BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_HOST_NOT_PROVIDED}`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_HOST_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    if (!sendRecoveryPasswordDto.appPort) {
      console.log(`[sendReoveryPasswordEmail] ${BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_PORT_NOT_PROVIDED}`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_PORT_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    if (!sendRecoveryPasswordDto.tokenExpiration) {
      console.log(`[sendReoveryPasswordEmail] ${BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.TOKEN_EXPIRATION_NOT_PROVIDED}`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.TOKEN_EXPIRATION_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const lang: string = req && req.headers && req.headers.clientlanguage 
      ? req.headers.clientlanguage.toString() 
      : TRANSLATE_CONSTANTS.DEFAULT_LANGUAGE;

    sendRecoveryPasswordDto.user = await this.usersRepository.modelToDto(existUser);
    const emailSended: boolean = await this.emailTemplatesService.sendReoveryPasswordEmail(sendRecoveryPasswordDto, lang);
    if (!emailSended) {
      console.log(`[sendReoveryPasswordEmail] Unnable to send email to user '${sendRecoveryPasswordDto.user.name}'`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAILER.EMAIL_UNNABLE_TO_SEND, HttpStatus.CONFLICT);
    }

    return res.status(200).json(emailSended);
  }

  @Post('sendActiveUserEmail')
  @ApiOperation({
    summary: `Send activation user email`,
    description: 'Send a email to user with a activation request',
  })
  @ApiBody({
    description: 'Send a activation user email with the class SendActivationUserDto',
    type: SendActivationUserDto,
    examples: {
      a: {
        value: {
          user: {
            name: USERS_CONSTANTS.PUBLIC.NAME,
            password: USERS_CONSTANTS.PUBLIC.PASSWORD,
            email: USERS_CONSTANTS.PUBLIC.EMAIL,
            active: USERS_CONSTANTS.PUBLIC.ACTIVE,
            role: USERS_CONSTANTS.PUBLIC.ROLE,
          },
          appHost: 'localhost',
          appPort: 4200,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Activation user email sended successfully',
  })
  @ApiResponse({
    status: 402,
    description: 'App host parameter not provided',
  })
  @ApiResponse({
    status: 402,
    description: 'App port parameter not provided',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Unnable to send activation user email',
  })
  async sendActiveUserEmail(
    @Req() req: Request, 
    @Res() res: Response, 
    @Body() sendActivationUserDto: SendActivationUserDto
  ): Promise<Response<boolean, Record<string, boolean>>> {
    const existUser: IUser = await this.usersRepository.findUserByName(sendActivationUserDto.user.name);
    if (!existUser) {
      console.log(`[sendActiveUserEmail] User '${sendActivationUserDto.user.name}' not found`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.USERS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (!sendActivationUserDto.appHost) {
      console.log(`[sendActiveUserEmail] ${BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_HOST_NOT_PROVIDED}`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_HOST_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    if (!sendActivationUserDto.appPort) {
      console.log(`[sendActiveUserEmail] ${BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_PORT_NOT_PROVIDED}`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAIL_TEMPLATES.APP_PORT_NOT_PROVIDED, HttpStatus.PAYMENT_REQUIRED);
    }

    const lang: string = req && req.headers && req.headers.clientlanguage 
      ? req.headers.clientlanguage.toString() 
      : TRANSLATE_CONSTANTS.DEFAULT_LANGUAGE;

    const emailSended: boolean = await this.emailTemplatesService.sendActiveUserEmail(sendActivationUserDto, lang);
    if (!emailSended) {
      console.log(`[sendActiveUserEmail] Unnable to send email to user '${sendActivationUserDto.user.name}'`);
      throw new HttpException(BACKEND_HTTP_ERROR_CONSTANTS.EMAILER.EMAIL_UNNABLE_TO_SEND, HttpStatus.CONFLICT);
    }

    return res.status(200).json(emailSended);
  }
}
