import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://virtuux:897158@cluster0.4yb4ugm.mongodb.net/test',
    ),
    AuthModule,
    ConversationModule,
    MessageModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
