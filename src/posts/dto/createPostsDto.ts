import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  content: string;


  @IsNotEmpty()
  @IsNumber()
  authority: number;


  user_id?: number;
}