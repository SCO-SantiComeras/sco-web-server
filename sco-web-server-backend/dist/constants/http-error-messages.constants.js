"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_HTTP_ERROR_CONSTANTS = void 0;
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
exports.BACKEND_HTTP_ERROR_CONSTANTS = Object.assign(Object.assign({}, sco_nestjs_utilities_1.HTTP_ERROR_CONSTANTS), { NODE_SERVER: {
        ROOT_PATH_NOT_EXIST: 'Root path not exists',
        ROOT_PATH_NO_FILES: 'Root path not files',
        UNNABLE_CREATE_ROOT_PATH_BACKUP: 'Unnable to create root path backup',
        UNNABLE_DOWNLOAD_FOLDER: 'Unnable to download folder',
        UNNABLE_DOWNLOAD_FILE: 'Unnable to download file',
        UNNABLE_CREATE_SERVER_FOLDER: 'Unnable to create server folder',
        UNNABLE_DELETE_SERVER_FOLDER: 'Unnable to delete server folder',
        PATH_NOT_PROVIDED: 'Path not provided',
        NEW_PATH_NOT_PROVIDED: 'New path not provided',
        PATH_NOT_EXISTS: 'Path not exists',
        PATH_ALREADY_EXISTS: 'Path already exists',
        PATH_IS_NOT_DIRECTORY: 'Path is not directory',
        PATH_IS_NOT_VALID: 'Path is not valid',
        NEW_PATH_ALREADY_EXISTS: 'New path already exists',
    } });
//# sourceMappingURL=http-error-messages.constants.js.map