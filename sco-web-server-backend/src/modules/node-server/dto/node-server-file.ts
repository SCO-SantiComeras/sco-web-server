import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class NodeServerFileDto {

    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.NAME.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.NAME.INVALID_VALUE })
    name: string;
    
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.EXTENSION.INVALID_VALUE })
    extension?: string;
    
    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.IMAGE.INVALID_VALUE })
    image?: string;

    @IsOptional()
    @IsNumber(undefined, { message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.SIZE.INVALID_VALUE })
    size?: number;

    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.TYPE.INVALID_VALUE })
    type?: string;

    @IsOptional()
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.TYPE_DESCRIPTION.INVALID_VALUE })
    typeDescription?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.MODIFIED_DATE.INVALID_VALUE })
    modifiedDate?: Date;

    constructor(name: string) {
        this.name = name;
        this.extension = '';
        this.size = undefined;
        this.type = '';
        this.typeDescription = '';
        this.modifiedDate = undefined;
    }
}