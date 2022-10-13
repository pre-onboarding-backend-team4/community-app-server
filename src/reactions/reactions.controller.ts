import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReactionDto } from './createReactionDto';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {
    this.reactionsService = reactionsService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateReactionDto) {
    return this.reactionsService.createReaction(createCommentDto);
  }
}
