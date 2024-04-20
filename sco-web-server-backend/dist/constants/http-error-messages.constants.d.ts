export declare const BACKEND_HTTP_ERROR_CONSTANTS: {
    NODE_SERVER: {
        ROOT_PATH_NOT_EXIST: string;
        ROOT_PATH_NO_FILES: string;
        UNNABLE_CREATE_ROOT_PATH_BACKUP: string;
        UNNABLE_DOWNLOAD_FOLDER: string;
        UNNABLE_DOWNLOAD_FILE: string;
        UNNABLE_CREATE_SERVER_FOLDER: string;
        UNNABLE_DELETE_SERVER_FOLDER: string;
        PATH_NOT_PROVIDED: string;
        NEW_PATH_NOT_PROVIDED: string;
        PATH_NOT_EXISTS: string;
        PATH_ALREADY_EXISTS: string;
        PATH_IS_NOT_DIRECTORY: string;
        PATH_IS_NOT_VALID: string;
        NEW_PATH_ALREADY_EXISTS: string;
    };
    APP: {
        METHOD_NOT_IMPLEMENTED: string;
        METHOD_NOT_ALLOWED: string;
        INTERNAL_SERVER_ERROR: string;
    };
    EMAILER: {
        EMAIL_RECEIVERS_NOT_PROVIDED: string;
        EMAIL_TEXT_NOT_PROVIDED: string;
        EMAIL_SUBJECT_NOT_PROVIDED: string;
        EMAIL_UNNABLE_TO_SEND: string;
    };
    EXCEL: {
        EXCEL_WORKBOOK_NOT_PROVIDED: string;
        EXCEL_FILENAME_NOT_PROVIDED: string;
        EXCEL_EXTENSION_NOT_PROVIDED: string;
        EXCEL_UNNABLE_TO_CREATE_FILE: string;
        EXCEL_INVALID_EXTENSION: string;
    };
    MICRO_SERVICE_CONNECTION: {
        MICRO_SERVICE_CONNECTION_CONNECTION_REFUSED: string;
        MICRO_SERVICE_CONNECTION_PORT_IN_USE: string;
    };
    SFTP: {
        SFTP_UNNABLE_PUT_FILE: string;
        SFTP_UNNABLE_GET_FILE: string;
        SFTP_UNNABLE_MOVE_FILE: string;
        SFTP_UNNABLE_DELETE_FILE: string;
        SFTP_UNNABLE_RENAME_FILE: string;
        SFTP_UNNABLE_EXIST_FILE: string;
        SFTP_UNNABLE_LIST_FILE: string;
        SFTP_UNNABLE_GET_BASE64_REMOTE_FILE: string;
        SFTP_UNNABLE_GET_BUFFER_REMOTE_FILE: string;
        SFTP_UNNABLE_CHECK_FILE_IS_DIRECTORY: string;
        SFTP_UNNABLE_UPLOAD_DIR: string;
        SFTP_UNNABLE_DOWNLOAD_DIR: string;
        SFTP_UNNABLE_CREATE_FOLDER: string;
        SFTP_UNNABLE_DELETE_FOLDER: string;
    };
    USERS: {
        USER_NOT_FOUND: string;
        USER_ALREADY_EXIST: string;
        NAME_ALREADY_EXIST: string;
        EMAIL_ALREADY_EXIST: string;
        CREATE_USER_ERROR: string;
        UPDATE_USER_ERROR: string;
    };
    PERMISSIONS: {
        PERMISSION_NOT_FOUND: string;
        PERMISSION_ALREADY_EXIST: string;
        CREATE_PERMISSION_ERROR: string;
        UPDATE_PERMISSION_ERROR: string;
    };
    ROLES: {
        ROLE_NOT_FOUND: string;
        ROLE_ALREADY_EXIST: string;
        CREATE_ROLE_ERROR: string;
        UPDATE_ROLE_ERROR: string;
    };
    AUTH: {
        INVALID_CREDENTIALS: string;
        UNNABLE_USER_TOKEN: string;
        UNAUTHORIZED: string;
        SESSION_EXPIRED: string;
        USER_NOT_ACTIVED: string;
    };
};
