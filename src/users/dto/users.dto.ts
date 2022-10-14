import { IsString, Matches, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: 'EMAIL_INVALID',
    },
  )
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(5)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'PASSWORD_INVALID',
  })
  password: string;
}

export class SignInDto {
  @IsString()
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: 'EMAIL_INVALID',
    },
  )
  email: string;

  @IsString()
  @MinLength(5)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'PASSWORD_INVALID',
  })
  password: string;
}

export class FollowDto {
  user_id: number;
  followed_id: number;
}
