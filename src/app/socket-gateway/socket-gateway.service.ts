import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { getBaseServerDomain } from 'src/environments/enviroment.dynamic';
import { StorageObjectNamesEnum } from '../common/enum/storage-objects-name.enum';
import { EventsHubService } from '../events-hub/events-hub.service';
import { EventType } from '../events-hub/enums/event-type.enum';

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

    this.socket.on('newNotification', (data) => {
      console.log('New notification received:', data);
      this._eventsHub.emit(EventType.NotificationNew, data)
      // Handle the received notification
    });

    // Additional event listeners can be added here
  }

  registerWithServer() {
    const token = localStorage.getItem(StorageObjectNamesEnum.JwtToken);
    this.socket = io(this._serverDomain, {
      auth: { token }
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  // Additional methods to interact with the socket
}
