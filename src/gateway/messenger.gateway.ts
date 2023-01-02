import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*:*' })
export class MessengerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    // this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }

  @OnEvent('message.create')
  async handleMessageCreateEvent(payload: any) {
    this.server.emit('onMessage', payload);
  }

  @OnEvent('message.delete')
  async deleteMessageEvent(messageId: string) {
    this.server.emit('onDeleteMessage', messageId);
  }
}
