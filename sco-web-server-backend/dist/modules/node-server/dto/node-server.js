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
exports.NodeServerDto = void 0;
const validation_error_messages_constants_1 = require("../../../constants/validation-error-messages.constants");
const class_validator_1 = require("class-validator");
const node_server_file_filter_1 = require("./node-server-file-filter");
class NodeServerDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.PATH.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.NEW_PATH.INVALID_VALUE }),
    __metadata("design:type", String)
], NodeServerDto.prototype, "newPath", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.RECURSIVE.INVALID_VALUE }),
    __metadata("design:type", Boolean)
], NodeServerDto.prototype, "recursive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)({ message: validation_error_messages_constants_1.BACKEND_VALIDATION_ERROR_CONSTANTS.NODE_SERVER.FILTER.INVALID_VALUE }),
    __metadata("design:type", node_server_file_filter_1.NodeServerFileFilterDto)
], NodeServerDto.prototype, "filter", void 0);
exports.NodeServerDto = NodeServerDto;
//# sourceMappingURL=node-server.js.map