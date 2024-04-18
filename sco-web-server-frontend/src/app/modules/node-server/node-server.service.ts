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
import { NodeServerDownload } from './model/node-server-download';

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
        if (filter) nodeServer.filter = filter;   
        return this.http.post<NodeServerFile[]>(`${environment.apiUrl}/node-server/list`, nodeServer);
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

    uploadFiles(nodeServer: NodeServer, files: File[]): Observable<boolean> {
        const form = new FormData();
        files.forEach((file) => { form.append('files[]', file); });

        let path: string = nodeServer.path;
        while (path.includes('/')) {
            path = path.replace('/', '-rootParse-');
        }

        return this.http.post<boolean>(`${environment.apiUrl}/node-server/uploadFiles/${JSON.stringify(path)}`, form);
    }

    downloadBackup(): Observable<NodeServerDownload> {
        return this.http.post<NodeServerDownload>(`${environment.apiUrl}/node-server/downloadBackup`, {});
    }

    downloadFolder(nodeServer: NodeServer): Observable<NodeServerDownload> {
        return this.http.post<NodeServerDownload>(`${environment.apiUrl}/node-server/downloadFolder`, nodeServer);
    }
    
      /* Web sockets */
    getNodeserverChangesBySocket(): any {
        return this.wsBackendService.getMessage(WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }
    
    removeSocket(): any {
        this.wsBackendService.removeListenerMessage(WEBSOCKET_EVENTS.WS_NODE_SERVER);
    }
}