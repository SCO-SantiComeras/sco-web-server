import { WebsocketsService } from './../../websockets/websockets.service';
import { WEBSOCKET_EVENTS } from './../../websockets/websocket.constants';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ScoJoinPipe } from "sco-angular-components";
import { Observable } from 'rxjs';
import { User } from './model/user';
import environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private readonly joinPipe: ScoJoinPipe,
    private readonly http: HttpClient,
    private readonly wsBackendService: WebsocketsService
  ) {}

  fetchUsers(filter: any): Observable<User[]> {
    const params: string[] = [];

    if (filter) {
      if (filter._id) {
        params.push(`_id=${filter._id}`);
      }
      if (filter.name) {
        params.push(`name=${filter.name}`);
      }
      if (filter.email) {
        params.push(`email=${filter.email}`);
      }
      if (filter.active != undefined) {
        params.push(`active=${filter.active}`);
      }
      if (filter.role) {
        params.push(`role=${filter.role}`);
      }
      if (filter.pwdRecoveryToken) {
        params.push(`pwdRecoveryToken=${filter.pwdRecoveryToken}`);
      }
      if (filter.pwdRecoveryDate) {
        params.push(`pwdRecoveryDate=${filter.pwdRecoveryDate}`);
      }
    }
    
    return this.http.get<User[]>(environment.apiUrl + `/users${params.length == 0 ? '' : '?' + this.joinPipe.transform(params, '&')}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users/', user);
  }

  updateUser(_id: string, user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + `/users/${_id}`, user);
  }

  deleteUser(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + `/users/${_id}`);
  }

  /* Web Sockets */
  getUsersBySocket(): any {
    return this.wsBackendService.getMessage(WEBSOCKET_EVENTS.WS_USERS);
  }
  removeSocket(): any {
    this.wsBackendService.removeListenerMessage(WEBSOCKET_EVENTS.WS_USERS);
  }
}
