import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { UserDto } from "sco-nestjs-utilities";
import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';

export class SendRecoveryPasswordDto {
    
    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.EMAIL.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.EMAIL.INVALID_VALUE })
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsObject({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.USER.INVALID_VALUE })
    user?: UserDto;

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.APP_HOST.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.APP_HOST.INVALID_VALUE })
    appHost: string;

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.APP_PORT.NOT_EMPTY })
    @IsNumber(undefined, { message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.APP_PORT.INVALID_VALUE })
    appPort: number;
    
    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.TOKEN_EXPIRATION.NOT_EMPTY })
    @IsNumber(undefined, { message: BACKEND_VALIDATION_ERROR_CONSTANTS.SEND_RECOVERY_PASSWORD.TOKEN_EXPIRATION.INVALID_VALUE })
    tokenExpiration: number;
}