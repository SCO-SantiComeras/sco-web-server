import { AuthState } from '../modules/auth/store/auth.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../modules/users/model/user';
import { ROLES_CONSTANTS } from '../constants/roles.constants';
import { Location } from '@angular/common';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private readonly store: Store,
    private readonly locationService: Location,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let canContinue: boolean = true;

    const user: User = this.store.selectSnapshot(AuthState.loggedUser);
    if (!user || user && !user.role) {
      canContinue = false;
    }

    if (user.role.name != ROLES_CONSTANTS.ADMIN.NAME && user.role.name != ROLES_CONSTANTS.SUPERADMIN.NAME) {
      canContinue = false;
    }

    if (!canContinue) {
      this.locationService.back();
    }

    return canContinue;
  }
}
