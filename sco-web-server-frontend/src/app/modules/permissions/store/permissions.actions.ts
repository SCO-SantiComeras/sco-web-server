import { Permission } from "../model/permission";

export class FetchPermissions {
  static readonly type = "[Permissions] Fetch all permissions";
  constructor(public payload: { filter: any }) {}
}

export class CreatePermission {
  static readonly type = "[Permissions] Create new permission";
  constructor(public payload: { permission: Permission }) {}
}

export class EditPermission {
  static readonly type = "[Permissions] Edit permission";
  constructor(
    public payload: { _id: string; permission: Permission }
  ) {}
}

export class DeletePermission {
  static readonly type = "[Permissions] Delete permission";
  constructor(public payload: { _id: string }) {}
}

/* Web sockets */
export class SubscribePermissionsWS {
  static readonly type = "[Permissions] Suscribe permissions WS";
}

export class UnSubscribePermissionsWS {
  static readonly type = "[Permissions] UnSuscribe permissions WS";
}