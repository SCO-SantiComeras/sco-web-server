import { ILogin } from 'sco-angular-components';
import { User } from '../../users/model/user';
import { SendRecoveryPassword } from '../model/send-recovery-password';
import { SendActivationUser } from '../model/send-activation-user';

/* Login & Logout */
export class LogIn {
  static readonly type = '[Auth] Login';
  constructor(public payload: { login: ILogin } ) {}
}

export class LogOut {
  static readonly type = '[Auth] Logout';
}

/* Register new user */
export class RegisterUser {
  static readonly type = '[Auth] Register user';
  constructor(public payload: { user: User }) {}
}

/* Request & Reset password */
export class RequestPassword {
  static readonly type = '[Auth] Request new password';
  constructor(public payload: { email: string }) {}
}

export class SendReoveryPasswordEmail {
  static readonly type = '[Auth] Send recovery password email';
  constructor(public payload: { sendRecoveryPassword: SendRecoveryPassword }) {}
}

export class ResetPassword {
  static readonly type = '[Auth] Reset password';
  constructor(public payload: { pwdRecoveryToken: string, user: User }) {}
}

export class FetchUserRecoveryPwd {
  static readonly type = '[Auth] Fetch user Recovery Pwd';
  constructor(public payload: { pwdRecoveryToken: string }) {}
}

/* Activation users email */
export class FetchUserByEmail {
  static readonly type = '[Auth] Fetch user Email';
  constructor(public payload: { email: string }) {}
}

export class SendActiveUserEmail {
  static readonly type = '[Auth] Send activation user email email';
  constructor(public payload: { sendActivationUser: SendActivationUser }) {}
}

export class ConfirmEmail {
  static readonly type = '[Auth] Confirm Users Email';
  constructor(public payload: { email: string }) {}
}

/* Token validation */
export class ValidateToken {
  static readonly type = '[Auth] Validate token';
  constructor(public payload: { user: User }) {}
}