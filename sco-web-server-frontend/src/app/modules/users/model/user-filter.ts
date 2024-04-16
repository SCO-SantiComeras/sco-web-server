export class UserFilter {
  _id?: string;
  name?: string;
  password?: string;
  newPassword?: string;
  email?: string;
  active?: boolean;
  role?: string;
  pwdRecoveryToken?: string;
  pwdRecoveryDate?: Date;
  extension?: any;
  createdAt?: Date;
  updatedAt?: Date;
  typeObj?: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.password = '';
    this.newPassword = '';
    this.email = '';
    this.active = undefined;
    this.role = '';
    this.pwdRecoveryToken = '';
    this.pwdRecoveryDate = undefined;
    this.extension = {};
    this.createdAt = undefined;
    this.updatedAt = undefined;
    this.typeObj = '';
  }
}