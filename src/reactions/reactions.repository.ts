import { Repository } from 'typeorm';
import { Reaction } from '../posts/posts.entity';
import { User } from '../users/users.entity';
import { CreateReactionDto } from './createReactionDto';
import { CustomRepository } from '../typeorm-ex.decorator';

@CustomRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> {
  async createReaction(createReactionDto: CreateReactionDto) {
    const { type, user_id, post_id } = createReactionDto;

    const reaction = this.create({
      type,
      user_id,
      post_id,
    });

    await this.save(reaction);
    return reaction;
  }
}

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
