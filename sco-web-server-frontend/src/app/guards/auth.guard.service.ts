import { AuthState } from '../modules/auth/store/auth.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Token } from '../modules/auth/model/token';
import { LogOut, ValidateToken } from '../modules/auth/store/auth.actions';
import { ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { User } from '../modules/users/model/user';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly store: Store,
    private readonly toastService: ScoToastService,
    private readonly translateService: ScoTranslateService,
    private readonly locationService: Location,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const token: Token = this.store.selectSnapshot(AuthState.token);
    const user: User = this.store.selectSnapshot(AuthState.loggedUser);

    if (!token || !user) {
      this.locationService.back();
      return false;
    }

    const validatedToken: boolean =  await new Promise<boolean>(resolve => {
      // Check If User Token Is Not Expired, If Not Expired Refresh User Token
      this.store.dispatch(new ValidateToken({ user: user })).subscribe({
        next: () => {
          const success: boolean = this.store.selectSnapshot(AuthState.success);
          if (success) {
            resolve(true);
            return true;
          }

          this.store.dispatch(new LogOut()).subscribe({
            next: () => {
              resolve(false);
              return false;
            },
          })

          resolve(false);
          return false;
        },
        error: () => {
          this.store.dispatch(new LogOut()).subscribe({
            next: () => {
              resolve(false);
              return false;
            }
          })
        }
      })
    });

    if (!validatedToken) {
      this.locationService.back();
      this.toastService.addErrorMessage(
        this.translateService.getTranslate('label.error'), 
        this.store.selectSnapshot(AuthState.errorMsg),
      );
    }

    return validatedToken;
  }
}
