import { VALIDATION_ERROR_CONSTANTS } from "sco-nestjs-utilities";

/* export const VALIDATION_ERROR_CONSTANTS = {
    PAGINATION: {
        TOTAL_ITEMS: {
            NOT_EMPTY: 'Total items should be not empty',
            INVALID_VALUE: 'Total items should be number value',
        },
        TOTAL_PAGES: {
            NOT_EMPTY: 'Total pages should be not empty',
            INVALID_VALUE: 'Total pages should be number value',
        },
        CURRENT_PAGE: {
            NOT_EMPTY: 'Current page should be not empty',
            INVALID_VALUE: 'Current page should be number value',
        },
        ITEMS: {
            NOT_EMPTY: 'Items should be not empty',
            INVALID_VALUE: 'Items should be any[] value',
        },
    },
    EMAILER: {
        TEXT: {
            NOT_EMPTY: 'Text should be not empty',
            INVALID_VALUE: 'Text should be string value',
        },
        RECEIVERS: {
            NOT_EMPTY: 'Receivers should be not empty',
            INVALID_VALUE: 'Receivers should be string[] value',
        },
        SUBJECT: {
            NOT_EMPTY: 'Subject should be not empty',
            INVALID_VALUE: 'Subject should be string value',
        },
        ATTACHMENTS: {
            NOT_EMPTY: 'Attachments should be not empty',
            INVALID_VALUE: 'Attachments should be any[] value',
        }
    },
    EXCEL: {
        WORKBOOK: {
            NOT_EMPTY: 'Workbook should be not empty',
            INVALID_VALUE: 'Workbook should be object WorkBook (xlsx) value',
        },
        FILE_NAME: {
            NOT_EMPTY: 'Filename should be not empty',
            INVALID_VALUE: 'Filename should be string value',
        },
        EXTENSION: {
            NOT_EMPTY: 'Extension should be not empty',
            INVALID_VALUE: 'Extension should be enum (ExcelExtensionEnum) value',
        },
    },
    SFTP: {
        PATH: {
            NOT_EMPTY: 'Path should be not empty',
            INVALID_VALUE: 'Path should be object string value',
        },
        NEW_PATH: {
            NOT_EMPTY: 'New path should be not empty',
            INVALID_VALUE: 'New path should be string value',
        },
        RECURSIVE: {
            NOT_EMPTY: 'Recursive should be not empty',
            INVALID_VALUE: 'Recursive should be boolean value',
        },
        VERBOSE: {
            NOT_EMPTY: 'Verbose should be not empty',
            INVALID_VALUE: 'Verbose should be boolean value',
        },
    },
    USERS: {
        ID: {
            NOT_EMPTY: '_id should be not empty',
            INVALID_VALUE: '_id should be string value',
        },
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
            MIN_LENGTH: 'Name minimum length is 4 characteres',
            MAX_LENGTH: 'Name maximum length is 15 characteres',
        },
        PASSWORD: {
            NOT_EMPTY: 'Password should be not empty',
            INVALID_VALUE: 'Password should be string value',
            MIN_LENGTH: 'Password minimum length is 8 characteres',
            MAX_LENGTH: 'Password maximum length is 30 characteres',
            MATCHES: 'Password invalid format. At least one upper case & one lower case & one number & one special character',
        },
        NEW_PASSWORD: {
            NOT_EMPTY: 'New password should be not empty',
            INVALID_VALUE: 'New password should be string value',
            MIN_LENGTH: 'New password minimum length is 8 characteres',
            MAX_LENGTH: 'New password maximum length is 30 characteres',
            MATCHES: 'New password invalid format. At least one upper case & one lower case & one number & one special character',
        },
        EMAIL: {
            NOT_EMPTY: 'Email should be not empty',
            INVALID_VALUE: 'Email should be string value',
            MATCHES: 'Email should be valid',
        },
        ACTIVE: {
            NOT_EMPTY: 'Active should be not empty',
            INVALID_VALUE: 'Active should be boolean value',
        },
        ROLE: {
            NOT_EMPTY: 'Role should be not empty',
            INVALID_VALUE: 'Role should be object (RoleDto) value',
        },
        PWD_RECOVERY_TOKEN: {
            NOT_EMPTY: 'Password recovery token should be not empty',
            INVALID_VALUE: 'Password recovery token should be string value',
        },
        PWD_RECOVERY_DATE: {
            NOT_EMPTY: 'Password recovery date should be not empty',
            INVALID_VALUE: 'Password recovery date should be date value',
        },
        EXTENSION: {
            NOT_EMPTY: 'Extension should be not empty',
            INVALID_VALUE: 'Extension should be object (any) value',
        },
        TYPE_OBJ: {
            NOT_EMPTY: 'TypeObj should be not empty',
            INVALID_VALUE: 'TypeObj should be string value',
        },
    },
    LOGIN: {
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
            MIN_LENGTH: 'Name minimum length is 4 characteres',
            MAX_LENGTH: 'Name maximum length is 15 characteres',
        },
        PASSWORD: {
            NOT_EMPTY: 'Password should be not empty',
            INVALID_VALUE: 'Password should be string value',
            MIN_LENGTH: 'Password minimum length is 8 characteres',
            MAX_LENGTH: 'Password maximum length is 30 characteres',
            MATCHES: 'Password invalid format. At least one upper case, one lower case, one number and one special character',
        }
    },
    TOKEN: {
        ACCESS_TOKEN: {
            NOT_EMPTY: 'Access token should be not empty',
            INVALID_VALUE: 'Access token should be string value',
        },
        TOKEN_TYPE: {
            NOT_EMPTY: 'Token type should be not empty',
            INVALID_VALUE: 'Token type should be string value',
        },
        USER: {
            NOT_EMPTY: 'User should be not empty',
            INVALID_VALUE: 'User should be object (UserDto) value',
        },
    },
    PERMISSION: {
        ID: {
            NOT_EMPTY: '_id should be not empty',
            INVALID_VALUE: '_id should be string value',
        },
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
        },
        TYPE_OBJ: {
            NOT_EMPTY: 'TypeObj should be not empty',
            INVALID_VALUE: 'TypeObj should be string value',
        },
    },
    ROLE: {
        ID: {
            NOT_EMPTY: '_id should be not empty',
            INVALID_VALUE: '_id should be string value',
        },
        NAME: {
            NOT_EMPTY: 'Name should be not empty',
            INVALID_VALUE: 'Name should be string value',
        },
        PERMISSIONS: {
            NOT_EMPTY: 'Permissions should be not empty',
            INVALID_VALUE: 'Permissions should be an array of permissionDto[] value',
        },
        TYPE_OBJ: {
            NOT_EMPTY: 'TypeObj should be not empty',
            INVALID_VALUE: 'TypeObj should be string value',
        },
    },
}; */

export const BACKEND_VALIDATION_ERROR_CONSTANTS = {
    ...VALIDATION_ERROR_CONSTANTS,
    NODE_SERVER: {
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
    },
    NODE_SERVER_FILE: {
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
    },
    NODE_SERVER_DOWNLOAD: {
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
    },
}