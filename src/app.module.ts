import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { Post, Reaction, Reply } from './posts/posts.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

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
      entities: [User, Post, Reaction, Reply],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
