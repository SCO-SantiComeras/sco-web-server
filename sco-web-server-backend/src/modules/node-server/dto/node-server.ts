import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";
import { NodeServerFileFilterDto } from './node-server-file-filter';

export class NodeServerDto { 

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.PATH.INVALID_VALUE })
    path?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH.INVALID_VALUE })
    newPath?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.RECURSIVE.INVALID_VALUE })
    recursive?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.FILTER.INVALID_VALUE })
    filter?: NodeServerFileFilterDto;
}