import { User } from "../../users/model/user";

/* Basic Users CRUD  */
export class FetchUsers{
    static readonly type = '[Users] Fetch all users';
    constructor(public payload: { filter: any }) {}
}

export class CreateUser {
    static readonly type = '[Users] Create new user';
    constructor(public payload: { user: User } ) {}
}

export class UpdateUser {
    static readonly type = '[Users] Edit a user';
    constructor(public payload: { _id: string, user: User }) {}
}

export class DeleteUser {
    static readonly type = '[Users] Delete a user';
    constructor(public payload: { _id: string}) {}
}

/* Web Sockets */
export class SubscribeUserWS{
    static readonly type = '[Users] Subscribe users WS'
}

export class UnSubscribeUserWS {
    static readonly type = '[Users] UnSubscribe users WS';
}