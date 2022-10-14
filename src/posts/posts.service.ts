import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPostsDto';
import { UpdatePostDto } from './dto/updatePostsDto';
import { Posts } from './posts.entity';


@Injectable()
export class PostsService {
  constructor( 
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    @InjectRepository(User)
    private userRepository: Repository<User>) {}


  async createPost(email: string, createPostDto: CreatePostDto): Promise<Posts> {
    const user = await this.userRepository.findOneBy({ email })
    createPostDto.user_id = user.id
    
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


  async updatePost(postId: number, email: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    const user = await this.userRepository.findOneBy({ email })
    const userId = user.id
  
    const updateRes = await this.postRepository.update({ id: postId, user_id: userId}, updatePostDto)
    if(!updateRes.affected) throw new Error("FAILED")

    return this.postRepository.findOneBy({ id: postId });
  }


  // 작성자만 삭제
  async deletePost(postId: number, email: string) {
    const foundPost = await this.postRepository.findOneBy({ id: postId })
    if(!foundPost) throw new NotFoundException("Not_Found")

    const user = await this.userRepository.findOneBy({ email })
    const userId = user.id

    const deleteRes = await this.postRepository.delete({ id: postId, user_id: userId });
    if(!deleteRes.affected) throw new Error("FAILED")
  }
} 