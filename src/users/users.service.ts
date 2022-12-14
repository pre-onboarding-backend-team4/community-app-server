import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, SignInDto, FollowDto } from './dto/users.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto) {
    const { email, name, password } = userDto;
    if (!email) {
      throw new Error('EMAIL_INVALID');
    }
    if (!name) {
      throw new Error('NAME_INVALID');
    }
    if (!password) {
      throw new Error('PASSWORD_INVALID');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      await this.userRepository.save({
        email,
        name,
        password: hashedPassword,
      });
      return { message: 'SIGNUP_SUCCESS' };
    } catch (error) {
      console.log('error', error);
      if (error.errno === 1062) {
        throw new ConflictException('EMAIL_ALREADY_USE');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user || (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { message: 'LOGIN_SUCCESS', token: accessToken };
    } else {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
  }

  async follow(user_email, followDto: FollowDto) {
    const { followed_id } = followDto;
    const user = await this.userRepository.findOne({
      where: { email: user_email },
    });
    const followed_user = await this.userRepository.findOne({
      where: { id: followed_id },
    });

    if (user === followed_user) {
      throw new Error('CANNOT_FOLLOW_ONESELF');
    }

    if (!user) {
      throw new Error('USER_ID_INVALID');
    }

    if (!followed_user) {
      throw new Error('FOLLOWED_USER_ID_INVALID');
    }

    try {
      user.followed_ids = [followed_user];
      await this.userRepository.save(user);
      return { message: 'FOLLOW_SUCCESS' };
    } catch (error) {
      console.log('error', error);
    }
  }
}
