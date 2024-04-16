
export class PermissionFilter {
    _id?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    typeObj?: string;

    constructor() {
        this._id = '';
        this.name = '';
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.typeObj = '';
    }
}