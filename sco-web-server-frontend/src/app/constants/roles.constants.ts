import { PERMISSIONS_CONSTANTS } from "./permissions.constants";

export const ROLES_CONSTANTS = {
    SUPERADMIN: {
        NAME: 'superadmin',
        PERMISSIONS: [
            { name: PERMISSIONS_CONSTANTS.READ },
            { name: PERMISSIONS_CONSTANTS.CREATE },
            { name: PERMISSIONS_CONSTANTS.UPDATE },
            { name: PERMISSIONS_CONSTANTS.DELETE },
        ]
    },
    ADMIN: {
        NAME: 'admin',
        PERMISSIONS: [
            { name: PERMISSIONS_CONSTANTS.READ },
            { name: PERMISSIONS_CONSTANTS.CREATE },
            { name: PERMISSIONS_CONSTANTS.UPDATE },
            { name: PERMISSIONS_CONSTANTS.DELETE },
        ]
    },
    USER: {
        NAME: 'user',
        PERMISSIONS: [
            { name: PERMISSIONS_CONSTANTS.READ }
        ]
    }
}