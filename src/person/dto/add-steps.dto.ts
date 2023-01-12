import { ApiProperty } from '@nestjs/swagger';

export class AddStepsDto {
  @ApiProperty()
  public readonly steps: number;
}
