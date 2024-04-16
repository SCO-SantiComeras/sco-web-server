import { ROLES_CONSTANTS } from "./roles.constants";

export const USERS_CONSTANTS = {
    SUPERADMIN: {
        NAME: 'superadmin',
        PASSWORD: 'Superadmin123456!',
        EMAIL: 'superadmin@sco-nestjs-utilities.es',
        ACTIVE: true,
        ROLE: {
            name: ROLES_CONSTANTS.SUPERADMIN.NAME,
            permissions: ROLES_CONSTANTS.SUPERADMIN.PERMISSIONS,
        },
    },
    ADMIN: {
        NAME: 'admin',
        PASSWORD: 'Admin123456!',
        EMAIL: 'admin@sco-nestjs-utilities.es',
        ACTIVE: true,
        ROLE: {
            name: ROLES_CONSTANTS.ADMIN.NAME,
            permissions: ROLES_CONSTANTS.ADMIN.PERMISSIONS,
        },
    },
     PUBLIC: {
        NAME: 'public',
        PASSWORD: 'Public123456!',
        EMAIL: 'public@sco-nestjs-utilities.es',
        ACTIVE: true,
        ROLE: {
            name: ROLES_CONSTANTS.USER.NAME,
            permissions: ROLES_CONSTANTS.USER.PERMISSIONS,
        },
    },
}