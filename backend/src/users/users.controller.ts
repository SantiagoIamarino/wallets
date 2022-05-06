import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get('/:username')
    async getUser( @Param('username') username ) {
        const user = await this.usersService.findUser(username)
        return user
    }

    @Post()
    createUser( @Body() createUserDto: CreateUserDto ) {
        return this.usersService.createUser(createUserDto)
    }

    @Put('/:id')
    updateUser( @Body() createUserDto: CreateUserDto, @Param('id') id ) {
        return this.usersService.updateUser(id, createUserDto)
    }

}
