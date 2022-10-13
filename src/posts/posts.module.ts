import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { PostsController } from './posts.controller';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, User])
    // AuthModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
