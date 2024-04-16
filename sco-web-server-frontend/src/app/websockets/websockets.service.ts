import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import environment from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})

export class WebsocketsService extends Socket {
  
  constructor() {
    super({
      url: `${environment.serverSocketUrl}`
    });
  }

  sendMessage(event: string, data?: any): void {
    if (data) {
      this.emit(event, data);
    } else {
      this.emit(event);
    }
  }

  getMessage(event: string): Observable<any> {
    return fromEvent(this.ioSocket,event).pipe(map((data: any) => data));
  }

  removeListenerMessage(event: string): void {
    this.removeListener(event);
  }

  connectWebSocket(): void {
    this.on('connect', () => {
      if (!environment.production) {
        console.log('Conexión con Backend');
      }
    });

    this.on('connect_error', () => {
      console.log('[Websocket] Backend websocket error connection');
    });
  }
}
