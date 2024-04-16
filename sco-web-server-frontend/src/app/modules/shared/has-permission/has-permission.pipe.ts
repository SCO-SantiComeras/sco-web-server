import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../auth/store/auth.state';
import { User } from '../../users/model/user';
import { ROLES_CONSTANTS } from '../../../constants/roles.constants';

@Pipe({
  name: 'hasPermission'
})
export class HasPermissionPipe implements PipeTransform {

  constructor(private readonly store: Store) {}

  transform(roles: string[]): any {
    const user = this.store.selectSnapshot(AuthState.loggedUser);
    return this.hasPermission(user, roles);
  }

  private hasPermission(user: User, permissions: string[]): boolean {
    if(user.role.name == ROLES_CONSTANTS.SUPERADMIN.NAME){
      return true;
    }
    
    const hasPermission =
      user &&
      user.role &&
      permissions
      .map(whitePermission => {
        return user.role.permissions.some(permission => {
          return permission.name.toUpperCase() === whitePermission.toUpperCase();
        });
      })
      .some(res => res);

    return hasPermission || permissions.includes("PUBLIC");
  }
}
