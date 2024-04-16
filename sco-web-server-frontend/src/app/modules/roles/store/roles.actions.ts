import { Role } from "../model/role";

export class FetchRoles {
    static readonly type = '[Roles] Fetch all roles';
    constructor(public payload: { filter: any }) {}
}

export class CreateRole {
    static readonly type = '[Roles] Create new role';
    constructor(public payload: { role: Role } ) {}
}

export class UpdateRole {
    static readonly type = '[Roles] Update a role';
    constructor(public payload: { _id:string, role: Role }) {}
}

export class DeleteRole {
    static readonly type = '[Roles] Delete a role';
    constructor(public payload: { _id: string }) {}
}

/* Websockets */
export class SubscribeRoleWS{
    static readonly type = '[ROLES] Subscribe roel WS'
}

export class UnSubscribeRoleWS {
    static readonly type = '[ROLES] UnSubscribe role WS';
}