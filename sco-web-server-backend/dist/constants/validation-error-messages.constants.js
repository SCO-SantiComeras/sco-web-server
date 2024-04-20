"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_VALIDATION_ERROR_CONSTANTS = void 0;
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
exports.BACKEND_VALIDATION_ERROR_CONSTANTS = Object.assign(Object.assign({}, sco_nestjs_utilities_1.VALIDATION_ERROR_CONSTANTS), { NODE_SERVER: {
        PATH: {
            NOT_EMPTY: 'Path should be not empty',
            INVALID_VALUE: 'Path should be string value',
        },
        NEW_PATH: {
            NOT_EMPTY: 'New path should be not empty',
            INVALID_VALUE: 'New path should be string value',
        },
        RECURSIVE: {
            NOT_EMPTY: 'Recursive should be not empty',
            INVALID_VALUE: 'Recursive should be boolean value',
        },
        FILTER: {
            NOT_EMPTY: 'Filter should be not empty',
            INVALID_VALUE: 'Filter should be NodeServerFileFilterDto value',
        },
    }, NODE_SERVER_FILE: {
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
        },
        EXTENSION: {
            NOT_EMPTY: 'Extension should be not empty',
            INVALID_VALUE: 'Extension should be string value',
        },
        IMAGE: {
            NOT_EMPTY: 'Image should be not empty',
            INVALID_VALUE: 'Image should be string value',
        },
        SIZE: {
            NOT_EMPTY: 'Size should be not empty',
            INVALID_VALUE: 'Size should be number value',
        },
        TYPE: {
            NOT_EMPTY: 'Type should be not empty',
            INVALID_VALUE: 'Type should be string value',
        },
        TYPE_DESCRIPTION: {
            NOT_EMPTY: 'Type description should be not empty',
            INVALID_VALUE: 'Type description should be string value',
        },
        MODIFIED_DATE: {
            NOT_EMPTY: 'Modified date should be not empty',
            INVALID_VALUE: 'Modified date should be Date value',
        },
    }, NODE_SERVER_DOWNLOAD: {
        FILE_NAME: {
            NOT_EMPTY: 'File name should be not empty',
            INVALID_VALUE: 'File name should be string value',
        },
        FILE_PATH: {
            NOT_EMPTY: 'File path should be not empty',
            INVALID_VALUE: 'File path should be string value',
        },
        FILE_TYPE: {
            NOT_EMPTY: 'File type should be not empty',
            INVALID_VALUE: 'File type should be string value',
        },
        BASE64: {
            NOT_EMPTY: 'Base64 should be not empty',
            INVALID_VALUE: 'Base64 should be string value',
        },
    } });
//# sourceMappingURL=validation-error-messages.constants.js.map