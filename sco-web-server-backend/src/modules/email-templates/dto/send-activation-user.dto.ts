import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { UserDto } from "sco-nestjs-utilities";
import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';

export class SendActivationUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.USER.NOT_EMPTY })
    @IsObject({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.USER.INVALID_VALUE })
    user: UserDto;

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.APP_HOST.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.APP_HOST.INVALID_VALUE })
    appHost: string;

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.APP_PORT.NOT_EMPTY })
    @IsNumber(undefined, { message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_ACTIVATION_USER.APP_PORT.INVALID_VALUE })
    appPort: number;
}