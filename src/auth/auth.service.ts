import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const userExists = await this.userService.findByUsername(
      registerDto.username,
    );

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const IsEmailExists = await this.userService.findByEmail(registerDto.email);
    if (IsEmailExists) {
      throw new BadRequestException('Email already taken');
    }

    await this.userService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password,
    });

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
