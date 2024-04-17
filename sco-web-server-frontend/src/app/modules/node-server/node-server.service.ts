import { WebsocketsService } from './../../websockets/websockets.service';
import { HttpClient } from '@angular/common/http';
import { WEBSOCKET_EVENTS } from '../../websockets/websocket.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeServer } from './model/node-server';
import environment from 'src/environments/environment';
import { NodeServerFile } from './model/node-server-file';
import { ScoJoinPipe } from 'sco-angular-components';
import { NodeServerFileFilter } from './model/node-server-file-filter';

@Injectable()
export class NodeServerService {

    constructor(
        private readonly joinPipe: ScoJoinPipe,
        private readonly http: HttpClient,
        private readonly wsBackendService: WebsocketsService
      ) {}
    
    exists(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/exists`, nodeServer);
    }

    isDirectory(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/isDirectory`, nodeServer);
    }

    isFile(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/isFile`, nodeServer);
    }

    list(nodeServer: NodeServer, filter: NodeServerFileFilter = undefined): Observable<NodeServerFile[]> {
        const params: string[] = [];

        if (filter) {
            if (filter.name) params.push(`name=${filter.name}`);
            if (filter.extension) params.push(`extension=${filter.extension}`);
            if (filter.size) params.push(`size=${filter.size}`);
            if (filter.type) params.push(`type=${filter.type}`);
            if (filter.typeDescription) params.push(`typeDescription=${filter.typeDescription}`);
            if (filter.modifiedDate) params.push(`modifiedDate=${filter.modifiedDate}`);
        }

        return this.http.post<NodeServerFile[]>(`${environment.apiUrl}/node-server/list
            ${
                params.length > 0 
                    ? `?${this.joinPipe.transform(params, '&')}`
                    : ``
            }`,
            nodeServer,
        );
    }

    delete(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/delete`, nodeServer);
    }

    copy(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/copy`, nodeServer);
    }

    move(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/move`, nodeServer);
    }

    createFolder(nodeServer: NodeServer): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/node-server/createFolder`, nodeServer);
    }
    
      /* Web sockets */
    getNodeserverChangesBySocket(): any {
        return this.wsBackendService.getMessage(WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }
    
    removeSocket(): any {
        this.wsBackendService.removeListenerMessage(WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }
}