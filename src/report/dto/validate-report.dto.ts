import { ApiProperty } from '@nestjs/swagger';

export class ValidateReportDto {
  @ApiProperty()
  idReport: string;

  @ApiProperty()
  isValid: boolean;

  @ApiProperty()
  nbPoints: number;
}
