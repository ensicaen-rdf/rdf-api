import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this._usersService.createUser(createUserDto.username, createUserDto.password);
    return new UserDto(user);
  }
}
