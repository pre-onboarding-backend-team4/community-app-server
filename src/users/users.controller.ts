import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userDto: UserDto) {
    console.log('test');
    return this.usersService.signUp(userDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }
}
