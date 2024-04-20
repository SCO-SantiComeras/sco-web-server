export declare const BACKEND_VALIDATION_ERROR_CONSTANTS: {
    NODE_SERVER: {
        PATH: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        NEW_PATH: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        RECURSIVE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        FILTER: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    NODE_SERVER_FILE: {
        NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        EXTENSION: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        IMAGE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        SIZE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TYPE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TYPE_DESCRIPTION: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        MODIFIED_DATE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    NODE_SERVER_DOWNLOAD: {
        FILE_NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        FILE_PATH: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        FILE_TYPE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        BASE64: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    PAGINATION: {
        TOTAL_ITEMS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TOTAL_PAGES: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        CURRENT_PAGE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        ITEMS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    EMAILER: {
        TEXT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        RECEIVERS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        SUBJECT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        ATTACHMENTS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    EXCEL: {
        COLUMNS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        DATA: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        WORKBOOK: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        FILE_NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        EXTENSION: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    SFTP: {
        PATH: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        NEW_PATH: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        RECURSIVE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        VERBOSE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    USERS: {
        ID: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MIN_LENGTH: string;
            MAX_LENGTH: string;
        };
        PASSWORD: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MIN_LENGTH: string;
            MAX_LENGTH: string;
            MATCHES: string;
        };
        NEW_PASSWORD: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MIN_LENGTH: string;
            MAX_LENGTH: string;
            MATCHES: string;
        };
        EMAIL: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MATCHES: string;
        };
        ACTIVE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        ROLE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        PWD_RECOVERY_TOKEN: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        PWD_RECOVERY_DATE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        EXTENSION: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        CREATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        UPDATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TYPE_OBJ: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    LOGIN: {
        NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MIN_LENGTH: string;
            MAX_LENGTH: string;
        };
        PASSWORD: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
            MIN_LENGTH: string;
            MAX_LENGTH: string;
            MATCHES: string;
        };
    };
    TOKEN: {
        ACCESS_TOKEN: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TOKEN_TYPE: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        USER: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    PERMISSION: {
        ID: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        CREATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        UPDATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TYPE_OBJ: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
    ROLE: {
        ID: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        NAME: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        PERMISSIONS: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        CREATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        UPDATED_AT: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
        TYPE_OBJ: {
            NOT_EMPTY: string;
            INVALID_VALUE: string;
        };
    };
};
