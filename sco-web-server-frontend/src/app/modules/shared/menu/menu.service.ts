import { ROLES_CONSTANTS } from '../../../constants/roles.constants';

import { Injectable } from '@angular/core';
import { User } from '../../users/model/user';
import { Role } from '../../roles/model/role';
import { MENU_ADMIN, MENU_SUPER_ADMIN, MENU_USER } from './menu.constants';
import { MenuItem } from 'sco-angular-components';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public selectMenu(user: User): MenuItem[] {
    if (!user || (user && !user.role) || (user && user.role && !user.role.name)) {
      return null;
    }

    const role: Role = user.role;
    if (role.name == ROLES_CONSTANTS.SUPERADMIN.NAME) {
      return MENU_SUPER_ADMIN;
    } else if (role.name == ROLES_CONSTANTS.ADMIN.NAME) {
      return MENU_ADMIN;
    } else if (role.name == ROLES_CONSTANTS.USER.NAME) {
      return MENU_USER;
    } else {
      return null;
    }
  }
}