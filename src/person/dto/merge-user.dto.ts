import { ApiProperty } from '@nestjs/swagger';

export class MergeUserDto {
  @ApiProperty()
  idPerson: string;

  @ApiProperty()
  idUser: string;
}
