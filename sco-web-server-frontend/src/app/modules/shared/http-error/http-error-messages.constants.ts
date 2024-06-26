export const httpErrorMessages = {
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
  },
  ROLES: {
    ROLE_NOT_FOUND: 'Role not found',
    ROLE_ALREADY_EXIST: 'Role already exist',
    CREATE_ROLE_ERROR: 'Unnable to create role',
    UPDATE_ROLE_ERROR: 'Unnable to update role',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNNABLE_USER_TOKEN: 'Unnable to generate user token',
    UNAUTHORIZED: 'Unauthorized',
    SESSION_EXPIRED: 'Session expired',
    USER_NOT_ACTIVED: 'User not actived',
  },
  NODE_SERVER: {
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
  }
};
  