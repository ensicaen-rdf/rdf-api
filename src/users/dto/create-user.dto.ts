import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  public username: string;

  @ApiProperty()
  public password: string;
}
