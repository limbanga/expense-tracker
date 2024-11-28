import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    @Body() user: { username: string; password: string },
  ): Promise<any> {
    const userExists = await this.userService.findByUsername(user.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    await this.userService.create(
      { username: user.username, password: user.password },
    );
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
