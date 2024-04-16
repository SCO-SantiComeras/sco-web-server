import { HTTP_ERROR_CONSTANTS } from "sco-nestjs-utilities";

/* export const HTTP_ERROR_CONSTANTS = {
  APP: {
    METHOD_NOT_IMPLEMENTED: 'Method not implemented',
    METHOD_NOT_ALLOWED: 'Method not allowed',
    INTERNAL_SERVER_ERROR: 'Internal server error',
  },
  EMAILER: {
    EMAIL_RECEIVERS_NOT_PROVIDED: 'Email receivers not provided',
    EMAIL_TEXT_NOT_PROVIDED: 'Email text not provided',
    EMAIL_SUBJECT_NOT_PROVIDED: 'Email subject not provided',
    EMAIL_UNNABLE_TO_SEND: 'Unnable to send email',
  },
  EXCEL: {
    EXCEL_WORKBOOK_NOT_PROVIDED: 'Excel workbook not provided',
    EXCEL_FILENAME_NOT_PROVIDED: 'Excel filename not provided',
    EXCEL_EXTENSION_NOT_PROVIDED: 'Excel extension not provided',
    EXCEL_UNNABLE_TO_CREATE_FILE: 'Unnable to create excel file',
    EXCEL_INVALID_EXTENSION: 'Excel extension is not invalid',
  },
  MICRO_SERVICE_CONNECTION: {
    MICRO_SERVICE_CONNECTION_CONNECTION_REFUSED: 'Connection refused by backend',
    MICRO_SERVICE_CONNECTION_PORT_IN_USE: 'Connection port already in use',
  },
  SFTP: {
    SFTP_UNNABLE_PUT_FILE: 'Unnable to put sftp file',
    SFTP_UNNABLE_GET_FILE: 'Unnable to get sftp file',
    SFTP_UNNABLE_MOVE_FILE: 'Unnable to move sftp file',
    SFTP_UNNABLE_DELETE_FILE: 'Unnable to delete sftp file',
    SFTP_UNNABLE_RENAME_FILE: 'Unnable to rename sftp file',
    SFTP_UNNABLE_EXIST_FILE: 'Unnable to exists sftp file',
    SFTP_UNNABLE_LIST_FILE: 'Unnable to list sftp file',
    SFTP_UNNABLE_GET_BASE64_REMOTE_FILE: 'Unnable to get base64 from remote file',
    SFTP_UNNABLE_GET_BUFFER_REMOTE_FILE: 'Unnable to get buffer from remote file',
    SFTP_UNNABLE_CHECK_FILE_IS_DIRECTORY: 'Unnable to check file is directory',
    SFTP_UNNABLE_UPLOAD_DIR: 'Unnable to upload dir',
    SFTP_UNNABLE_DOWNLOAD_DIR: 'Unnable to download dir',
    SFTP_UNNABLE_CREATE_FOLDER: 'Unnable to create folder',
    SFTP_UNNABLE_DELETE_FOLDER: 'Unnable to delete folder',
  },
  USERS: {
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXIST: 'User already exist',
    NAME_ALREADY_EXIST: 'Name already registered',
    EMAIL_ALREADY_EXIST: 'Email already registered',
    CREATE_USER_ERROR: 'Unnable to create user',
    UPDATE_USER_ERROR: 'Unnable to update user',
    UNNABLE_DELETE_ADMIN: 'Unnable to delete admin',
    UNNABLE_UPDATE_ADMIN: 'Unnable to update admin',
  },
  PERMISSIONS: {
    PERMISSION_NOT_FOUND: 'Permission not found',
    PERMISSION_ALREADY_EXIST: 'Permission already exist',
    CREATE_PERMISSION_ERROR: 'Unnable to create permission',
    UPDATE_PERMISSION_ERROR: 'Unnable to update permission',
    UNNABLE_DELETE_PERMISSION: 'Unnable to delete permission',
  },
  ROLES: {
    ROLE_NOT_FOUND: 'Role not found',
    ROLE_ALREADY_EXIST: 'Role already exist',
    CREATE_ROLE_ERROR: 'Unnable to create role',
    UPDATE_ROLE_ERROR: 'Unnable to update role',
    UNNABLE_ROLE_PERMISSION: 'Unnable to delete role',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNNABLE_USER_TOKEN: 'Unnable to generate user token',
    UNAUTHORIZED: 'Unauthorized',
    SESSION_EXPIRED: 'Session expired',
    USER_NOT_ACTIVED: 'User not actived',
  },
}; */

export const BACKEND_HTTP_ERROR_CONSTANTS = {
  ...HTTP_ERROR_CONSTANTS,
  EMAIL_TEMPLATES: {
    APP_HOST_NOT_PROVIDED: 'App host not provided',
    APP_PORT_NOT_PROVIDED: 'App port not provided',
    TOKEN_EXPIRATION_NOT_PROVIDED: 'Token expiration not provided',
  }
}