import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { Posts, Reaction, Reply } from './posts/posts.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { ReplysModule } from './replys/replys.module';
import { ReplysController } from './replys/replys.controller';
import { ReplysService } from './replys/replys.service';
import { TypeOrmExModule } from './typeorm-ex.module';
import { ReplyRepository } from './replys/replys.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TypeOrmExModule.forCustomRepository([ReplyRepository]),
    UsersModule,
    PostsModule,
    ReplysModule,
  ],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    ReplysController,
  ],
  providers: [AppService, UsersService, PostsService, ReplysService],
})
export class AppModule {}
