export class RoleFilter {
  _id?: string;
  name?: string;
  permissions?: string;
  createdAt?: Date;
  updatedAt?: Date;
  typeObj?: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.permissions = '';
    this.createdAt = undefined;
    this.updatedAt = undefined;
    this.typeObj = '';
  }
}