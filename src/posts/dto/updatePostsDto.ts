import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './createPostsDto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}