import { Role } from "../../roles/model/role";

export class User {
  _id?: string;
  name: string;
  password?: string;
  newPassword?: string;
  email: string;
  active?: boolean;
  role: Role;
  pwdRecoveryToken?: string;
  pwdRecoveryDate?: Date;
  extension?: any;
  createdAt?: Date;
  updatedAt?: Date;
  typeObj?: string;
}