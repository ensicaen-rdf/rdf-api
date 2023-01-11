import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  familyName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  birthPlace: string;
}
