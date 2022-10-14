import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { Posts, Reaction, Reply } from './posts/posts.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { ReplysModule } from './replys/replys.module';
import { ReplysController } from './replys/replys.controller';
import { ReplysService } from './replys/replys.service';
import { TypeOrmExModule } from './typeorm-ex.module';
import { ReplyRepository } from './replys/replys.repository';
import { ReactionsModule } from './reactions/reactions.module';
import { ReactionsController } from './reactions/reactions.controller';
import {
  ReactionRepository,
  UserRepository,
} from './reactions/reactions.repository';
import { ReactionsService } from './reactions/reactions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATASOURCE_URL,
      port: 3306,
      username: process.env.DATASOURCE_USERNAME,
      password: process.env.DATASOURCE_PASSWORD,
      database: process.env.DATASOURCE_DATABASE,
      entities: [User, Posts, Reaction, Reply],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([
      ReplyRepository,
      ReactionRepository,
      UserRepository,
    ]),
    UsersModule,
    PostsModule,
    ReplysModule,
    ReactionsModule,
  ],
  controllers: [
    AppController,
    PostsController,
    ReplysController,
    ReactionsController,
  ],
  providers: [AppService, PostsService, ReplysService, ReactionsService],
})
export class AppModule {}
