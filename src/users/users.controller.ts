import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(
    @Body() user: { name: string; email: string; password: string },
  ) {
    return this.userService.create(user);
  }
}
