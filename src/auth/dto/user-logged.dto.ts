import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../database/entities/user.model';
import { UserDto } from '../../users/dto/user.dto';

export class UserLoggedDto {
  @ApiProperty()
  public token: string;

  @ApiProperty()
  public user: UserDto;

  constructor(token: string, user: User) {
    this.token = token;
    this.user = new UserDto(user);
  }
}
