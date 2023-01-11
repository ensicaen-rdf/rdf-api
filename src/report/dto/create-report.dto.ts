import { ApiProperty } from "@nestjs/swagger";

export class CreateReportDto {
  @ApiProperty()
  idPersonTarget: string;
  
  @ApiProperty()
  reason: string;
}
