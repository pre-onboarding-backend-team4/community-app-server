import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ReactionsController } from './reactions.controller';
import { ReactionRepository, UserRepository } from './reactions.repository';
import { ReactionsService } from './reactions.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReactionRepository, UserRepository]),
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
