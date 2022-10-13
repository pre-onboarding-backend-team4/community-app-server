import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController { 
  constructor(private postsService: PostsService) {}
  
  
  @Post()
  // @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createPost( @Body() createPostDto: CreatePostDto,
              // @Req() req: Request
            ): Promise<Posts> {
    // createPostDto.user_id = req.user
    createPostDto.user_id = 2 ;
    return this.postsService.createPost(createPostDto);
  }
  //@Headers('user_id') user_id: number
  //@Headers('token').user_id user_id: number


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
  // @UseGuards(AuthGuard())  
  updatePost( 
    @Param('postId') id: number,
    @Body() updatePostDto: UpdatePostDto
              // @Req() req: Request

    ): Promise<Posts> {
      // const userId = req.user
    const userId = 1;
    return this.postsService.updatePost(id, userId, updatePostDto);
}


  @Delete('/:postId')
  // @UseGuards(AuthGuard())
  deletePost( @Param('postId') postId: number ) {
              // @Req() req: Request
      // const userId = req.user
    const userId = 1;
    this.postsService.deletePost(postId, userId);
  }
}