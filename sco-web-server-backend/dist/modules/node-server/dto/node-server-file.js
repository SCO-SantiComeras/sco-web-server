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
exports.NodeServerFileDto = void 0;
const validation_error_messages_constants_1 = require("../../../constants/validation-error-messages.constants");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class NodeServerFileDto {
    constructor(name) {
        this.name = name;
        this.extension = '';
        this.size = undefined;
        this.type = '';
        this.typeDescription = '';
        this.modifiedDate = undefined;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.NAME.NOT_EMPTY }),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.NAME.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerFileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.EXTENSION.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerFileDto.prototype, "extension", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.IMAGE.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerFileDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(undefined, { message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.SIZE.INVALID_VALUE }),
    __metadata("design:type", Number)
], NodeServerFileDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.TYPE.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerFileDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.TYPE_DESCRIPTION.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerFileDto.prototype, "typeDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER_FILE.MODIFIED_DATE.INVALID_VALUE }),
    __metadata("design:type", Date)
], NodeServerFileDto.prototype, "modifiedDate", void 0);
exports.NodeServerFileDto = NodeServerFileDto;
//# sourceMappingURL=node-server-file.js.map