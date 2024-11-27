import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor() { }

    @Get()
    getUsers(): string {
        return 'All users updated';
    }

}
