import { WEBSOCKET_EVENTS } from '../../websockets/websocket.constants';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import environment from "src/environments/environment";
import { Permission } from "./model/permission";
import { ScoJoinPipe } from "sco-angular-components";
import { WebsocketsService } from "../../websockets/websockets.service";

@Injectable({
  providedIn: "root",
})
export class PermissionsService {
  
  constructor(
    private readonly joinPipe: ScoJoinPipe,
    private readonly http: HttpClient,
    private readonly wsBackendService: WebsocketsService
  ) {}

  fetchPermissions(filter: any): Observable<Permission[]> {
    const params: string[] = [];

    if (filter) {
      if (filter._id) {
        params.push(`_id=${filter._id}`);
      }
      if (filter.name) {
        params.push(`name=${filter.name}`);
      }
    }

    return this.http.get<Permission[]>(environment.apiUrl + `/permissions${params.length == 0 ? '' : `?${this.joinPipe.transform(params, '&')}`}`);
  }

  createPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(environment.apiUrl + "/permissions", permission);
  }

  editPermission(_id: string, permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(environment.apiUrl + `/permissions/${_id}`, permission);
  }

  deletePermission(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + `/permissions/${_id}`);
  }

  /* Web sockets */
  getPermissionsBySocket(): any {
    return this.wsBackendService.getMessage(WEBSOCKET_EVENTS.WS_PERMISSIONS);
  }

  removeSocket(): any {
    this.wsBackendService.removeListenerMessage(WEBSOCKET_EVENTS.WS_PERMISSIONS);
  }
}
