import { Injectable } from '@nestjs/common';
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
}
