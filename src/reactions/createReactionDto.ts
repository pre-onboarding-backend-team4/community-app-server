import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReactionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  post_id: number;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}
