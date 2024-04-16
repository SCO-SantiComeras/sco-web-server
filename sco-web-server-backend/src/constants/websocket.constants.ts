import { WEBSOCKET_EVENTS } from "sco-nestjs-utilities";

/* export const WEBSOCKET_EVENTS = {
    WS_EMAILS: 'WS_EMAILS',
    WS_EXCELS: 'WS_EXCELS',
    WS_SFTP: 'WS_SFTP',
    WS_AUTH: 'WS_AUTH',
    WS_PERMISSIONS: 'WS_PERMISSIONS',
    WS_ROLES: 'WS_ROLES',
    WS_USERS: 'WS_USERS',
}; */
  
export const BACKEND_WEBSOCKET_EVENTS = {
    ...WEBSOCKET_EVENTS,
};