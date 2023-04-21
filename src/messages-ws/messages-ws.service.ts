import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectClient {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connectClient: ConnectClient = {};

  registerClient(client: Socket) {
    this.connectClient[client.id] = client;
  }

  removeClinet(clientId: string) {
    delete this.connectClient[clientId];
  }

  getConnectClients(): string[] {
    return Object.keys(this.connectClient);
  }
}
