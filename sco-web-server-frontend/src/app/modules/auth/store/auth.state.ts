import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Token } from '../model/token';
import { User } from '../../users/model/user';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ScoCacheService, ScoTranslateService } from 'sco-angular-components';
import { HttpErrorsService } from '../../shared/http-error/http-errors.service';
import { ConfirmEmail, FetchUserByEmail, FetchUserRecoveryPwd, LogIn, LogOut, RegisterUser, RequestPassword, ResetPassword, SendActiveUserEmail, SendReoveryPasswordEmail, ValidateToken } from './auth.actions';
import { catchError, tap } from 'rxjs';
import { MENU_LOGOUT } from '../../shared/menu/menu.constants';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';

export class AuthStateModel {
  loggedUser: User;
  token: Token;
  user: User;
  success: boolean;
  successMsg: string;
  errorMsg: string;
}

export const AuthStateDefaults: AuthStateModel = {
  loggedUser: undefined,
  token: undefined,
  user: undefined,
  success: false,
  successMsg: undefined,
  errorMsg: undefined,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: AuthStateDefaults,
}) 

@Injectable()
export class AuthState {
  constructor(
      private readonly authService: AuthService,
      private readonly translateService: ScoTranslateService,
      private readonly httpErrorsService: HttpErrorsService,
      private readonly cacheService: ScoCacheService,
  ) {}

  @Selector()
  static loggedUser(state: AuthStateModel): User {
      return state.loggedUser;
  }

  @Selector()
  static token(state: AuthStateModel): Token {
      return state.token;
  }
  
  @Selector()
  static user(state: AuthStateModel): User {
      return state.user;
  }

  @Selector()
  static success(state: AuthStateModel): boolean {
      return state.success;
  }

  @Selector()
  static successMsg(state: AuthStateModel): string {
      return state.successMsg;
  }

  @Selector()
  static errorMsg(state: AuthStateModel): string {
      return state.errorMsg;
  }

  /* Login & Logout */
  @Action(LogIn)
  public logIn(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: LogIn
  ) {
      return this.authService.logIn(payload.login).pipe(
          tap((token: Token) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.login.error'),
              });

              if (token) {
                patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.login.success'),
                      loggedUser: token.user,
                      token: token
                });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.login.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              throw new Error(error);
          }),
      );
  }

  @Action(LogOut)
  public logOut({ patchState }: StateContext<AuthStateModel>) {
    this.cacheService.setElement(CACHE_CONSTANTS.MENU_ITEMS, MENU_LOGOUT);

    patchState({
        success: true,
        successMsg: this.translateService.getTranslate('label.auth.state.logout.success'),
        loggedUser: undefined,
        token: undefined,
    });
  }

  /* Register new user */
  @Action(RegisterUser)
  public registerUser(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: RegisterUser
  ) {
      return this.authService.registerUser(payload.user).pipe(
          tap((user: User) => {
              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: this.translateService.getTranslate('label.auth.state.register.error'),
              });

              if (user) {
                  patchState({
                      success: true,
                      user: user,
                      successMsg: this.translateService.getTranslate('label.auth.state.register.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.register.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  /* Request & Reset password */
  @Action(RequestPassword)
  public requestPassword(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: RequestPassword
  ) {
      return this.authService.requestPassword(payload.email).pipe(
          tap((result: boolean) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.request.password.error'),
              });

              if (result) {
                  patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.request.password.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.request.password.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  @Action(SendReoveryPasswordEmail)
  public sendReoveryPasswordEmail(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: SendReoveryPasswordEmail
  ) {
      return this.authService.sendReoveryPasswordEmail(payload.sendRecoveryPassword).pipe(
          tap((result: boolean) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.send-recovery-password.error'),
              });

              if (result) {
                  patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.send-recovery-password.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.send-recovery-password.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  @Action(ResetPassword)
  public resetPassword(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: ResetPassword
  ) {
      return this.authService.resetPassword(payload.pwdRecoveryToken, payload.user).pipe(
          tap((result: boolean) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.reset.password.error'),
              });

              if (result) {
                  patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.reset.password.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.reset.password.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  @Action(FetchUserRecoveryPwd)
  public fetchUserRecoveryPwd(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: FetchUserRecoveryPwd
  ) {
      return this.authService.fetchUserRecoveryPwd(payload.pwdRecoveryToken).pipe(
          tap((user: User) => {
              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: this.translateService.getTranslate('label.auth.state.fetch.user.pwdRecovery.error')
              });

              if (user) {
                  patchState({
                      success: true,
                      user: user,
                      successMsg: this.translateService.getTranslate('label.auth.state.fetch.user.pwdRecovery.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.fetch.user.pwdRecovery.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  /* Activation users email */
  @Action(FetchUserByEmail)
  public fetchUserByEmail(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: FetchUserByEmail
  ) {
      return this.authService.fetchUserByEmail(payload.email).pipe(
          tap((user: User) => {
              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: this.translateService.getTranslate('label.auth.state.fetch.user.email.error')
              });

              if (user) {
                  patchState({
                      success: true,
                      user: user,
                      successMsg: this.translateService.getTranslate('label.auth.state.fetch.user.email.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.fetch.user.email.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  user: undefined,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  @Action(SendActiveUserEmail)
  public sendActiveUserEmail(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: SendActiveUserEmail
  ) {
      return this.authService.sendActiveUserEmail(payload.sendActivationUser).pipe(
          tap((result: boolean) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.send-active-user.error'),
              });

              if (result) {
                  patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.send-active-user.success')
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.send-active-user.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  @Action(ConfirmEmail)
  public confirmEmail(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: ConfirmEmail
  ) {
      return this.authService.confirmEmail(payload.email).pipe(
          tap((result: boolean) => {
              patchState({
                  success: false,
                  errorMsg: this.translateService.getTranslate('label.auth.state.confirm.email.error'),
              });

              if (result) {
                  patchState({
                      success: true,
                      successMsg: this.translateService.getTranslate('label.auth.state.confirm.email.success'),
                  });
              }
          }),
          catchError(error => {
              let errorMsg: string = this.translateService.getTranslate('label.auth.state.confirm.email.error');
              if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                  errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
              }

              patchState({
                  success: false,
                  errorMsg: errorMsg,
              });
              
              throw new Error(error);
          }),
      );
  }

  /* Token validation */
  @Action(ValidateToken)
  public validateToken(
      { patchState }: StateContext<AuthStateModel>,
      { payload }: ValidateToken
  ) {
    return this.authService.validateToken(payload.user).pipe(
        tap((token: Token) => {
            patchState({
                success: false,
                token: undefined,
                loggedUser: undefined,
                errorMsg: this.translateService.getTranslate('label.auth.state.validate.token.error'),
            });
            
            if (token) {
                patchState({
                    success: true,
                    token: token,
                    loggedUser: token.user,
                });
            }
        }),
        catchError(error => {
            let errorMsg: string = this.translateService.getTranslate('label.auth.state.validate.token.error');
            if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
            }

            patchState({
                success: false,
                token: undefined,
                loggedUser: undefined,
                errorMsg: errorMsg,
            });
            
            throw new Error(error);
        }),
    );
  }
}