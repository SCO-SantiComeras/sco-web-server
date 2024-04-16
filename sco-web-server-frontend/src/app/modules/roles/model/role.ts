import { Permission } from "../../permissions/model/permission";

export class Role {
  _id?: string;
  name: string;
  permissions: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  typeObj?: string;

  constructor(name: string = undefined) {
    this.name = name;
  }
}