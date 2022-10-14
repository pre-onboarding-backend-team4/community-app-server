import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReactionDto } from './createReactionDto';
import { ReactionRepository, UserRepository } from './reactions.repository';

/*
@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(ReactionRepository)
    private reactionRepository: ReactionRepository,
  ) {}
*/
@Injectable()
export class ReactionsService {
  constructor(
    private readonly reactionRepository: ReactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  createReaction(createReactionDto: CreateReactionDto) {
    return this.reactionRepository.createReaction(createReactionDto);
  }

  async deleteReaction(body, id): Promise<void> {
    const data = await this.reactionRepository.findOne({
      select: {
        user_id: true,
      },
      where: {
        id: id,
      },
    });

    if (data.user_id != body) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: body,
      },
    });
    if (!user) {
      throw new NotFoundException(`Can't find User with user id ${body}`);
    }

    const result = await this.reactionRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Reaction with reaction id ${id}`);
    }
  }
}
