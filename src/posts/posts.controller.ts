import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPostsDto';
import { UpdatePostDto } from './dto/updatePostsDto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';

@Controller('posts')
export class PostsController { 
  constructor(
    private postsService: PostsService,
    private jwtService: JwtService) {}


  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  createPost(
    @Headers('token') token: string,
    @Body() createPostDto: CreatePostDto ): Promise<Posts> {

    const user = this.jwtService.verify(token, {secret: process.env.SECRET});
    return this.postsService.createPost(user.email, createPostDto);
  }


  // post 목록 - 공개글만
  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postsService.getAllPosts();
  }


  // 특정 유저의 모든 공개된 posts. 
  @Get('/user/:userId')
  getPostByUserId( @Param('userId') id: number ): Promise<Posts[]>{
    return this.postsService.getPostsByUserId(id);
  }


  // 특정 post의 상세 내용
  @Get('/:postId')
  getPostByPostId( @Param('postId') id: number ): Promise<Posts> {
    return this.postsService.getPostByPostId(id);
  }


  // 특정 post 수정(title || content || authority)
  @Patch('/:postId')
  updatePost( 
    @Headers('token') token: string,
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto): Promise<Posts> {

    const user = this.jwtService.verify(token, {secret: process.env.SECRET});
    return this.postsService.updatePost(postId, user.email, updatePostDto);
}


  @Delete('/:postId')
  deletePost( 
    @Headers('token') token: string,
    @Param('postId') postId: number ) {
    
    const user = this.jwtService.verify(token, {secret: process.env.SECRET});
    this.postsService.deletePost(postId, user.email);
  }
}