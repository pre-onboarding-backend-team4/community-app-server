import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { Posts } from './posts.entity';


@Injectable()
export class PostsService {
  constructor( 
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>) {}


  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const post = this.postRepository.create(createPostDto)
    await this.postRepository.save(post);
    return post;
  }


  // post 목록들 - 공개글만
  async getAllPosts(): Promise<Posts[]> {
    return await this.postRepository.find({
      select: {
        id: true,
        title: true,
        user_id: true,
        created_at: true,
        updated_at: true
      },
      where: {
        authority: 1
      }
    })  
    // findBy({ authority: 1 });
  }


  async getPostsByUserId(id: number): Promise<Posts[]> {
    return await this.postRepository.find({
      select: {
        id: true,
        title: true,
        user_id: true,
        created_at: true,
        updated_at: true
      },
      where: {
        user_id: id,
        authority: 1
      }
    })
  }


  async getPostByPostId(id: number): Promise<Posts> {
    return await this.postRepository.findOneBy({ id, authority: 1 });
  }


  async updatePost(id: number, userId: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    await this.postRepository.update([id, userId], updatePostDto)
    return this.postRepository.findOneBy({ id });
  }


  // 작성자만 삭제
  async deletePost(postId: number, userId: number) {
    const foundPost = await this.postRepository.findOneBy({ id: postId })
    if(!foundPost) throw new NotFoundException("Not_Found")
    const deleteRes = await this.postRepository.delete({ id: postId, user_id: userId });
    if(!deleteRes.affected) throw new Error("FAILED")
  }
} 