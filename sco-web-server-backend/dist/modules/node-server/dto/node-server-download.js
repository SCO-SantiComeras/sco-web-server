"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeServerDownloadDto = void 0;
const validation_error_messages_constants_1 = require("../../../constants/validation-error-messages.constants");
const class_validator_1 = require("class-validator");
class NodeServerDownloadDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_NAME.NOT_EMPTY }),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_NAME.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDownloadDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_PATH.NOT_EMPTY }),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_PATH.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDownloadDto.prototype, "filePath", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_TYPE.NOT_EMPTY }),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.FILE_TYPE.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDownloadDto.prototype, "fileType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.BASE64.NOT_EMPTY }),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_DOWNLOAD.BASE64.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDownloadDto.prototype, "base64", void 0);
exports.NodeServerDownloadDto = NodeServerDownloadDto;
//# sourceMappingURL=node-server-download.js.map