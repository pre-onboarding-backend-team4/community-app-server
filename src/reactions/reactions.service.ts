import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReactionDto } from './createReactionDto';
import { ReactionRepository } from './reactions.repository';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(ReactionRepository)
    private reactionRepository: ReactionRepository,
  ) {}

  createReaction(createReactionDto: CreateReactionDto) {
    return this.reactionRepository.createReaction(createReactionDto);
  }

  async deleteReaction(body, id): Promise<void> {
    const result = await this.reactionRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
