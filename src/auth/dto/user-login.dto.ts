import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly password: string;
}
