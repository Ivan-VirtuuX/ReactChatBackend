import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.conversationService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') conversationId: string) {
    return this.conversationService.findOne(conversationId);
  }

  @Get(':id/messages')
  findMessages() {
    return this.conversationService.findMessages();
  }

  @Delete(':id')
  remove(@Param('id') conversationId: string) {
    return this.conversationService.remove(conversationId);
  }
}
