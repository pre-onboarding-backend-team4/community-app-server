import { Module } from '@nestjs/common';
import { ReplysController } from './replys.controller';
import { ReplysService } from './replys.service';
import { ReplyRepository } from './replys.repository';
import { TypeOrmExModule } from '../typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ReplyRepository])],
  controllers: [ReplysController],
  providers: [ReplysService],
})
export class ReplysModule {}
