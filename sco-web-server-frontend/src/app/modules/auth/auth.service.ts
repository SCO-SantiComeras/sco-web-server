import { SendRecoveryPassword } from './model/send-recovery-password';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './model/token';
import  environment  from './../../../environments/environment';
import { User } from '../users/model/user';
import { ILogin } from 'sco-angular-components';
import { SendActivationUser } from './model/send-activation-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private readonly http: HttpClient) {}

  /* Login */
  logIn(login: ILogin): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/auth/login`, login);
  }

  /* Register new user */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/auth/register', user);
  }

  /* Request & Reset password */
  requestPassword(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + `/auth/request-password/${email}`);
  }

  sendReoveryPasswordEmail(sendRecoveryPasswordDto: SendRecoveryPassword): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + `/email-templates/sendReoveryPasswordEmail`, sendRecoveryPasswordDto);
  }

  resetPassword(pwdRecoveryToken: string, user: User): Observable<boolean> {
    return this.http.put<boolean>(environment.apiUrl + `/auth/reset-password/${pwdRecoveryToken}`, user);
  }

  fetchUserRecoveryPwd(pwdRecoveryToken: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/auth/getUserRecoveryPassword/${pwdRecoveryToken}`);
  }

  /* Activation users email */
  fetchUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/auth/getUserEmail/${email}`);
  }

  sendActiveUserEmail(sendActivationUser: SendActivationUser): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + `/email-templates/sendActiveUserEmail`, sendActivationUser);
  }

  confirmEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + `/auth/confirmEmail/${email}`);
  }

  /* Token validation */
  validateToken(user: User): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + '/auth/validate-token', user);
  }
}
