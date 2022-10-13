import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
