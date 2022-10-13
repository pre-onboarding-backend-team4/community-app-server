import { ReplysService } from './replys.service';
import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from './createCommentDto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Reply, Posts } from '../posts/posts.entity';
import { User } from '../users/users.entity';

@Controller('comments')
//@UseInterceptors(SuccessInterceptor)
//@UseFilters(HttpExceptionFilter)
export class ReplysController {
  constructor(private replysService: ReplysService) {
    this.replysService = replysService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.replysService.createComment(createCommentDto);
  }
}
