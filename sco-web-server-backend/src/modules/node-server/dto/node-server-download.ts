import { BACKEND_VALIDATION_ERROR_CONSTANTS } from './../../../constants/validation-error-messages.constants';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NodeServerDownloadDto {

    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_NAME.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_NAME.INVALID_VALUE })
    fileName: string;   
    
    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_PATH.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_PATH.INVALID_VALUE })
    filePath: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_TYPE.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_TYPE.INVALID_VALUE })
    fileType: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.BASE64.NOT_EMPTY })
    @IsString({ message: BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.BASE64.INVALID_VALUE })
    base64: string;
}