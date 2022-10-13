import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Posts, Reply } from '../posts/posts.entity';
import { CreateCommentDto } from './createCommentDto';
import { CustomRepository } from '../typeorm-ex.decorator';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  async createComment(createCommentDto: CreateCommentDto) {
    const { content, user_id, post_id } = createCommentDto;

    const comment = this.create({
      content,
      user_id,
      post_id,
    });

    await this.save(comment);
    return comment;
  }
}
