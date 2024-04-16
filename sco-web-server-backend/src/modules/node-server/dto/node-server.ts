import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class NodeServerDto { 

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.PATH.INVALID_VALUE })
    path?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH.INVALID_VALUE })
    newPath?: string;
}