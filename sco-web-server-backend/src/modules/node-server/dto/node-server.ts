import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';
import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";
import { NodeServerFileFilterDto } from './node-server-file-filter';

export class NodeServerDto { 

    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.PATH.INVALID_VALUE })
    path?: string;

    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH.INVALID_VALUE })
    newPath?: string;

    @IsOptional()
    @IsBoolean({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.RECURSIVE.INVALID_VALUE })
    recursive?: boolean;

    @IsOptional()
    @IsObject({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.FILTER.INVALID_VALUE })
    filter?: NodeServerFileFilterDto;
}