import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts, Reply } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';
import { CreateCommentDto } from './createCommentDto';
import { ReplyRepository } from './replys.repository';

@Injectable()
export class ReplysService {
  constructor(
    @InjectRepository(ReplyRepository) private replyRepository: ReplyRepository,
  ) {}

  createComment(createCommentDto: CreateCommentDto) {
    return this.replyRepository.createComment(createCommentDto);
  }
}
