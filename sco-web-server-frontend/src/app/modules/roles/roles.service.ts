import { WEBSOCKET_EVENTS } from './../../websockets/websocket.constants';
import { WebsocketsService } from './../../websockets/websockets.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environment from 'src/environments/environment';
import { Role } from './model/role';
import { ScoJoinPipe } from 'sco-angular-components';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private readonly joinPipe: ScoJoinPipe,
    private readonly http: HttpClient,
    private readonly wsBackendService: WebsocketsService
  ) {}

  fetchRoles(filter: any): Observable<Role[]> {
    const params: string[] = [];

    if (filter) {
      if (filter._id) {
        params.push(`_id=${filter._id}`);
      }
      if (filter.name) {
        params.push(`name=${filter.name}`);
      }
    }

    return this.http.get<Role[]>(environment.apiUrl + `/roles${params.length == 0 ? '' : `?${this.joinPipe.transform(params, '&')}`}`);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(environment.apiUrl + '/roles/', role);
  }

  updateRole(_id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(environment.apiUrl + `/roles/${_id}`, role)
  }

  deleteRole(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + `/roles/${_id}`)
  }

  /* Web Sockets */
  getRoleBySocket(): any {
    return this.wsBackendService.getMessage(WEBSOCKET_EVENTS.WS_ROLES);
  }

  removeSocket(): any {
    this.wsBackendService.removeListenerMessage(WEBSOCKET_EVENTS.WS_ROLES);
  }
}