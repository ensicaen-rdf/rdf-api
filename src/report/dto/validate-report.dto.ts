import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  isValid: boolean;

  @ApiProperty()
  nbPoints: number;
}
