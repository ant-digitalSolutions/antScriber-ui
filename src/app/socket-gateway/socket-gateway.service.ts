import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { getBaseServerDomain } from 'src/environments/enviroment.dynamic';

@Injectable({
  providedIn: 'root',
})
export class SocketGatewayService {
  private socket: Socket;

  private _serverDomain = getBaseServerDomain();

  constructor() {
    this.socket = io(this._serverDomain); // Replace with your server URL

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // this.registerWithServer('your-client-uuid'); // Replace with the actual UUID
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('newNotification', (data) => {
      console.log('New notification received:', data);
      // Handle the received notification
    });

    // Additional event listeners can be added here
  }

  registerWithServer(clientId: string) {
    this.socket.emit('registerClient', { clientId });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  // Additional methods to interact with the socket
}
