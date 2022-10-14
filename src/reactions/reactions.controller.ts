import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateReactionDto } from './createReactionDto';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {
    this.reactionsService = reactionsService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateReactionDto) {
    return this.reactionsService.createReaction(createCommentDto);
  }

  @Delete('/:id')
  deleteBoard(
    @Body('user_id', ParseIntPipe) body,
    @Param('id', ParseIntPipe) id,
  ): Promise<void> {
    return this.reactionsService.deleteReaction(body, id);
  }
}
