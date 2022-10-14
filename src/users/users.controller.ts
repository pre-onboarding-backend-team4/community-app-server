import {
  Body,
  Controller,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SignInDto, UserDto, FollowDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userDto: UserDto) {
    return this.usersService.signUp(userDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Post('/follow')
  follow(
    @Headers('token') token: string,
    @Body(ValidationPipe) followDto: FollowDto,
  ) {
    const user = this.jwtService.verify(token, { secret: process.env.SECRET });
    return this.usersService.follow(user.email, followDto);
  }
}
