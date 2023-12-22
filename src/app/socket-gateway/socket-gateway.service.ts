import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { getBaseServerDomain } from 'src/environments/enviroment.dynamic';
import { StorageObjectNamesEnum } from '../common/enum/storage-objects-name.enum';
import { EventsHubService } from '../events-hub/events-hub.service';

@Injectable({
  providedIn: 'root',
})
export class SocketGatewayService {
  private socket: Socket;

  private _serverDomain = getBaseServerDomain();

  constructor(private _eventsHub: EventsHubService) {
    this.registerWithServer();

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // this.registerWithServer('your-client-uuid'); // Replace with the actual UUID
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.registerListeners()

    // Additional event listeners can be added here
  }

  registerWithServer() {
    const token = localStorage.getItem(StorageObjectNamesEnum.JwtToken);
    this.socket = io(this._serverDomain, {
      auth: { token },
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  registerListeners() {
    this.socket.onAny((event, args) => {
      this._eventsHub.emit(event, args);
    });
  }
  // Additional methods to interact with the socket
}
