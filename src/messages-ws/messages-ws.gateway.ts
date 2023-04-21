import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dtp';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}
  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization as string;

    console.log(token);

    this.messagesWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClinet(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectClients(),
    );
    console.log('Desconnect');
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! Emitir a un CLIENTE
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'No message',
    // });

    //! Emitir a todos, menos al cliente inicial
    client.broadcast.emit('message-from-server', {
      fullName: 'Soy yo',
      message: payload.message || 'No message',
    });

    this.wss.emit('message-from-server', {
      fullName: 'Soy yo',
      message: payload.message || 'No message',
    });
  }
}
