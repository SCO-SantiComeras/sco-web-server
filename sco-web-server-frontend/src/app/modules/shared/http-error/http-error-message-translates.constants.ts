export const httpErrorMessageTranslates = {
  ES: {
    APP: {
      METHOD_NOT_IMPLEMENTED: 'Método no implementado',
      METHOD_NOT_ALLOWED: 'Método no permitido',
      INTERNAL_SERVER_ERROR: 'Internal server error',
    },
    EMAILER: {
      EMAIL_RECEIVERS_NOT_PROVIDED: 'Lista de recividores de email no proporcionada',
      EMAIL_TEXT_NOT_PROVIDED: 'Texto del email no proporcionado',
      EMAIL_SUBJECT_NOT_PROVIDED: 'Asunto de email no proporcionado',
      EMAIL_UNNABLE_TO_SEND: 'Imposible envíar el email',
    },
    EXCEL: {
      EXCEL_WORKBOOK_NOT_PROVIDED: 'Libro de trabajo excel no proporcionado',
      EXCEL_FILENAME_NOT_PROVIDED: 'Nombre del fichero excel no proporcionado',
      EXCEL_EXTENSION_NOT_PROVIDED: 'Extensión del fichero excel no proporcionada',
      EXCEL_UNNABLE_TO_CREATE_FILE: 'Imposible crear el fichero excel',
      EXCEL_INVALID_EXTENSION: 'La extensión del fichero excel no es válida',
    },
    MICRO_SERVICE_CONNECTION: {
      MICRO_SERVICE_CONNECTION_CONNECTION_REFUSED: 'Conexión rechazada por el backend',
      MICRO_SERVICE_CONNECTION_PORT_IN_USE: 'El puerto de conexón ya está en uso',
    },
    SFTP: {
      SFTP_UNNABLE_PUT_FILE: 'Imposible dejar fichero en el sftp',
      SFTP_UNNABLE_GET_FILE: 'Imposible recuperar fichero en el sftp',
      SFTP_UNNABLE_MOVE_FILE: 'Imposible mover el fichero en el sftp',
      SFTP_UNNABLE_DELETE_FILE: 'Imposible eliminar el fichero en el sftp',
      SFTP_UNNABLE_RENAME_FILE: 'Imposible renombrar el fichero en el sftp',
      SFTP_UNNABLE_EXIST_FILE: 'Imposible comprobar si existe en el sftp',
      SFTP_UNNABLE_LIST_FILE: 'Imposible listar fichero en el sftp',
      SFTP_UNNABLE_GET_BASE64_REMOTE_FILE: 'Imposible recuperar base64 del fichero remoto',
      SFTP_UNNABLE_GET_BUFFER_REMOTE_FILE: 'Imposible recuperar buffer del fichero remoto',
      SFTP_UNNABLE_CHECK_FILE_IS_DIRECTORY: 'Imposible comprobar si el fichero es un directorio',
      SFTP_UNNABLE_UPLOAD_DIR: 'Imposible subir carpeta al sftp',
      SFTP_UNNABLE_DOWNLOAD_DIR: 'Imposible descargar carpeta del sftp',
      SFTP_UNNABLE_CREATE_FOLDER: 'Imposible crear carpeta en el sftp',
      SFTP_UNNABLE_DELETE_FOLDER: 'Imposible eliminar carpeta del sftp',
    },
    USERS: {
      USER_NOT_FOUND: 'Usuario no encontrado',
      USER_ALREADY_EXIST: 'El usuario ya existe',
      NAME_ALREADY_EXIST: 'El nombre ya está registrado',
      EMAIL_ALREADY_EXIST: 'El email ya ha sido registrado',
      CREATE_USER_ERROR: 'Imposible crear el usuario',
      UPDATE_USER_ERROR: 'Imposible actualizar el usuario',
    },
    PERMISSIONS: {
      PERMISSION_NOT_FOUND: 'Permiso no encontrado',
      PERMISSION_ALREADY_EXIST: 'El permiso ya existe',
      CREATE_PERMISSION_ERROR: 'Imposible crear el permiso',
      UPDATE_PERMISSION_ERROR: 'Imposible actalizar el permiso',
    },
    ROLES: {
      ROLE_NOT_FOUND: 'Rol no encontrado',
      ROLE_ALREADY_EXIST: 'El rol ya existe',
      CREATE_ROLE_ERROR: 'Imposible crear el rol',
      UPDATE_ROLE_ERROR: 'Imposible actualizar el rol',
    },
    AUTH: {
      INVALID_CREDENTIALS: 'Credenciales inválidas',
      UNNABLE_USER_TOKEN: 'Imposible crear un toke para el usuario',
      UNAUTHORIZED: 'No autorizado',
      SESSION_EXPIRED: 'La sesión ha terminado',
      USER_NOT_ACTIVED: 'El usuario no está activo',
    },
    NODE_SERVER: {
      ROOT_PATH_NOT_EXIST: 'La ruta raíz no existe',
      ROOT_PATH_NO_FILES: 'La ruta raíz no contiene archivos',
      UNNABLE_CREATE_ROOT_PATH_BACKUP: 'Imposible crear un backup de la ruta raíz',
      UNNABLE_DOWNLOAD_FOLDER: 'Imposible descargar directorio',

      UNNABLE_CREATE_SERVER_FOLDER: 'Imposible crear la carpeta del servidor',
      UNNABLE_DELETE_SERVER_FOLDER: 'Imposible eliminar la carpeta del servidor',

      PATH_NOT_PROVIDED: 'Ruta no informada',
      NEW_PATH_NOT_PROVIDED: 'Nueva ruta no informada',
      
      PATH_NOT_EXISTS: 'La ruta no existe',
      PATH_ALREADY_EXISTS: 'La ruta ya existe',
      PATH_IS_NOT_DIRECTORY: 'La ruta no es un directorio',
      PATH_IS_NOT_VALID: 'La ruta no es válida',

      NEW_PATH_ALREADY_EXISTS: 'La nueva ruta ya existe',
    }
  },

  EN: {
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
  }

  /* Future Translates... */
};
  